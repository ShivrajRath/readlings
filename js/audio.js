/* ==========================================================================
   Readlings — read-along audio controller
   --------------------------------------------------------------------------
   A small, dependency-free wrapper around the Web Speech API.

   Highlights:
   • Chooses the warmest natural English voice available on the device.
   • Defaults to a calm 0.85× pace and a cheerful 1.05 pitch.
   • Turns `boundary` events into exact word highlights through a word map.
   • Gives the UI a small, predictable state machine:
       idle → playing ⇄ paused → ended / error
   ========================================================================== */

(function () {
  "use strict";

  var DEFAULT_RATE = 0.85;
  var DEFAULT_PITCH = 1.05;
  var MIN_RATE = 0.7;
  var MAX_RATE = 1.0;

  var ENGLISH_LANGUAGE = /^en($|[-_])/i;

  /* Names that historically belong to the most natural consumer voices. */
  var PREFERRED_NAMES = [
    "samantha",
    "karen",
    "ava",
    "allison",
    "serena",
    "moira",
    "tessa",
    "kate",
    "daniel",
    "aria",
    "jenny",
    "natasha",
    "emma",
    "sonia",
    "libby",
    "michelle",
    "zoe",
    "google us english",
    "google uk english female",
    "microsoft aria",
    "microsoft jenny",
    "microsoft natasha",
    "microsoft emma"
  ];

  /* Fun voices are lovely for play — not for a learn-to-read lesson. */
  var NOVELTY_NAMES = [
    "albert",
    "bad news",
    "bahh",
    "bells",
    "boing",
    "bubbles",
    "cellos",
    "good news",
    "jester",
    "organ",
    "superstar",
    "trinoids",
    "whisper",
    "wobble",
    "zarvox",
    "grandpa",
    "grandma",
    "rocko",
    "shelley",
    "sandy",
    "flo",
    "eddy",
    "junior",
    "ralph",
    "kathy",
    "fred",
    "espeak",
    "compact"
  ];

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value)));
  }

  function speechIsSupported() {
    return Boolean(
      window.speechSynthesis &&
      typeof window.SpeechSynthesisUtterance === "function"
    );
  }

  /**
   * Score a voice for a cosy, natural read-along. Higher is better.
   * The scoring is deliberately forgiving: if we are on a minimal Linux or
   * Android install we still choose an English voice rather than fail.
   */
  function scoreVoice(voice) {
    if (!voice || !ENGLISH_LANGUAGE.test(voice.lang || "")) {
      return -1000;
    }

    var name = (voice.name || "").toLowerCase();
    var lang = (voice.lang || "").replace("_", "-").toLowerCase();
    var score = 0;

    if (lang === "en-us") {
      score += 6;
    } else if (lang === "en-gb") {
      score += 5;
    } else if (lang === "en-au" || lang === "en-nz") {
      score += 4;
    } else if (lang === "en-ca" || lang === "en-ie" || lang === "en-za") {
      score += 3;
    } else {
      score += 1;
    }

    if (name.indexOf("natural") !== -1) {
      score += 24;
    }
    if (name.indexOf("neural") !== -1) {
      score += 20;
    }
    if (name.indexOf("premium") !== -1 || name.indexOf("enhanced") !== -1) {
      score += 14;
    }
    if (name.indexOf("google") !== -1) {
      score += 11;
    }
    if (name.indexOf("siri") !== -1) {
      score += 10;
    }

    PREFERRED_NAMES.forEach(function (preferredName) {
      if (name.indexOf(preferredName) !== -1) {
        score += 9;
      }
    });

    /* Cloud voices often sound more fluid than compact offline voices. */
    if (voice.localService === false) {
      score += 4;
    }

    if (/female|woman/i.test(name)) {
      score += 1;
    }

    NOVELTY_NAMES.forEach(function (noveltyName) {
      if (name.indexOf(noveltyName) !== -1) {
        score -= 80;
      }
    });

    return score;
  }

  /**
   * Return the highest-scoring English voice, preferring a stable tie-break
   * so the same voice is chosen on every visit.
   */
  function selectBestVoice(voices) {
    if (!voices || !voices.length) {
      return null;
    }

    return voices
      .filter(function (voice) {
        return ENGLISH_LANGUAGE.test(voice.lang || "");
      })
      .map(function (voice, index) {
        return {
          voice: voice,
          index: index,
          score: scoreVoice(voice)
        };
      })
      .sort(function (a, b) {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.voice.name.localeCompare(b.voice.name);
      })[0]?.voice || null;
  }

  function getAvailableVoices() {
    if (!speechIsSupported()) {
      return [];
    }

    var voices = window.speechSynthesis.getVoices();
    return Array.isArray(voices) ? voices.slice() : [];
  }

  class ReadlingsAudio {
    constructor(options) {
      this.options = options || {};
      this.onStateChange = this.options.onStateChange || function () {};
      this.onWord = this.options.onWord || function () {};
      this.onFinish = this.options.onFinish || function () {};
      this.onError = this.options.onError || function () {};
      this.onVoicesChanged = this.options.onVoicesChanged || function () {};

      this.supported = speechIsSupported();
      this.state = "idle";
      this.text = "";
      this.words = [];
      this.currentWordIndex = -1;
      this.rate = clamp(this.options.rate || DEFAULT_RATE, MIN_RATE, MAX_RATE);
      this.pitch = this.options.pitch || DEFAULT_PITCH;
      this.voice = null;
      this.voices = [];
      this.utterance = null;
      this.cancelled = false;
      this.startedOnce = false;
      this.sessionId = 0;
      this._voiceTimer = null;

      if (!this.supported) {
        return;
      }

      this.handleVoicesChanged = this.handleVoicesChanged.bind(this);
      this.refreshVoices(false);

      if (typeof window.speechSynthesis.addEventListener === "function") {
        window.speechSynthesis.addEventListener("voiceschanged", this.handleVoicesChanged);
      } else {
        /* Older Safari exposes the property instead of addEventListener. */
        window.speechSynthesis.onvoiceschanged = this.handleVoicesChanged;
      }

      /* Some browser builds populate voices asynchronously but forget to fire
         voiceschanged. A short retry keeps the status honest without polling. */
      this._voiceTimer = window.setTimeout(this.handleVoicesChanged, 1200);
    }

    handleVoicesChanged() {
      if (!this.supported) {
        return;
      }

      this.refreshVoices(true);
    }

    refreshVoices(notify) {
      this.voices = getAvailableVoices();
      this.voice = selectBestVoice(this.voices);

      if (notify) {
        this.onVoicesChanged({
          supported: this.supported,
          voice: this.voice,
          voices: this.voices
        });
      }

      return this.voice;
    }

    getVoiceLabel() {
      return this.voice ? this.voice.name : "your device’s voice";
    }

    setRate(rate) {
      this.rate = clamp(rate, MIN_RATE, MAX_RATE);
      return this.rate;
    }

    setPitch(pitch) {
      this.pitch = clamp(pitch, 0.5, 2);
      return this.pitch;
    }

    /**
     * Keep the exact spoken text plus word records:
     * { start: 12, end: 16, element: <span> }
     */
    setContent(text, words) {
      this.stop({ notify: false, keepContent: true });
      this.text = typeof text === "string" ? text : "";
      this.words = Array.isArray(words) ? words : [];
      this.currentWordIndex = -1;
      this.setState("idle", { reason: "content" });
    }

    /**
     * Find the word record that starts at or immediately before a character
     * index reported by the speech engine. Binary search keeps long chapters
     * cheap even on small tablets.
     */
    findWordIndexAt(charIndex) {
      var words = this.words;
      if (!words.length) {
        return -1;
      }

      var low = 0;
      var high = words.length - 1;
      var best = 0;

      while (low <= high) {
        var middle = Math.floor((low + high) / 2);
        if (words[middle].start <= charIndex) {
          best = middle;
          low = middle + 1;
        } else {
          high = middle - 1;
        }
      }

      return best;
    }

    setState(state, detail) {
      this.state = state;
      this.onStateChange({
        state: state,
        supported: this.supported,
        voice: this.voice,
        detail: detail || null
      });
    }

    emitWord(index) {
      if (index === this.currentWordIndex) {
        return;
      }

      var previous = this.currentWordIndex;
      this.currentWordIndex = index;

      if (previous >= 0 && this.words[previous]) {
        this.onWord(null, previous, this.words[previous]);
      }

      var record = index >= 0 ? this.words[index] : null;
      if (record) {
        this.onWord(record, index, null);
      }
    }

    play() {
      if (!this.supported) {
        this.setState("error", { code: "unsupported" });
        this.onError({
          code: "unsupported",
          message: "Read-along audio is not available in this browser."
        });
        return;
      }

      if (!this.text) {
        this.setState("error", { code: "empty" });
        this.onError({
          code: "empty",
          message: "There is no story text to read yet."
        });
        return;
      }

      if (this.state === "paused" && window.speechSynthesis.paused) {
        this.resume();
        return;
      }

      this.refreshVoices(false);

      /* Cancel any lingering queued speech before starting a fresh reading.
         A session id keeps late events from an old utterance out of the UI. */
      this.cancelled = false;
      this.sessionId += 1;
      var session = this.sessionId;
      window.speechSynthesis.cancel();
      this.emitWord(-1);

      var utterance = new window.SpeechSynthesisUtterance(this.text);
      var self = this;

      utterance.rate = this.rate;
      utterance.pitch = this.pitch;
      utterance.volume = 1;
      utterance.lang = this.voice?.lang || "en-US";

      if (this.voice) {
        utterance.voice = this.voice;
      }

      utterance.onstart = function () {
        if (self.cancelled || self.sessionId !== session) {
          return;
        }
        self.startedOnce = true;
        self.setState("playing");
      };

      /**
       * The browser reports `word` boundaries with charIndex positions into
       * the same string we gave the utterance. Because app.js builds the word
       * map from that exact string, the matching span can be highlighted
       * instantly without any estimation or timers.
       */
      utterance.onboundary = function (event) {
        if (self.cancelled || self.sessionId !== session) {
          return;
        }

        /* Safari and some Android engines omit event.name; treat those
           word-like boundaries the same way, but never highlight sentences. */
        if (event.name && event.name !== "word") {
          return;
        }

        var index = self.findWordIndexAt(event.charIndex || 0);
        if (index >= 0) {
          self.emitWord(index);
        }
      };

      utterance.onpause = function () {
        if (!self.cancelled && self.sessionId === session && self.state === "playing") {
          self.setState("paused");
        }
      };

      utterance.onresume = function () {
        if (!self.cancelled && self.sessionId === session && self.state === "paused") {
          self.setState("playing");
        }
      };

      utterance.onend = function () {
        if (self.cancelled || self.sessionId !== session) {
          return;
        }

        self.startedOnce = false;
        self.emitWord(-1);
        self.utterance = null;
        self.setState("ended");
        self.onFinish({
          voice: self.voice,
          textLength: self.text.length
        });
      };

      utterance.onerror = function (event) {
        var errorCode = (event && event.error) || "unknown";

        /* Cancelling speech to leave a page or restart is not an error worth
           interrupting a child with. */
        if (
          self.cancelled ||
          self.sessionId !== session ||
          errorCode === "interrupted" ||
          errorCode === "canceled"
        ) {
          return;
        }

        self.emitWord(-1);
        self.startedOnce = false;
        self.setState("error", { code: errorCode });
        self.onError({
          code: errorCode,
          message: friendlySpeechError(errorCode)
        });
      };

      this.utterance = utterance;
      this.startedOnce = false;
      this.setState("playing", { starting: true });
      window.speechSynthesis.speak(utterance);
    }

    pause() {
      if (!this.supported || this.state !== "playing") {
        return;
      }

      window.speechSynthesis.pause();
      this.setState("paused");
    }

    resume() {
      if (!this.supported || this.state !== "paused") {
        return;
      }

      window.speechSynthesis.resume();
      this.setState("playing");
    }

    toggle() {
      if (this.state === "playing") {
        this.pause();
      } else if (this.state === "paused") {
        this.resume();
      } else {
        this.play();
      }
    }

    stop(options) {
      var settings = options || {};
      this.cancelled = true;
      this.sessionId += 1;

      if (this.supported) {
        window.speechSynthesis.cancel();
      }

      this.emitWord(-1);
      this.startedOnce = false;
      this.utterance = null;

      if (!settings.keepContent) {
        /* The text and word map stay available so Play can restart later. */
      }

      if (settings.notify !== false) {
        this.setState("idle", { reason: "stopped" });
      }
    }

    destroy() {
      if (!this.supported) {
        return;
      }

      window.clearTimeout(this._voiceTimer);
      window.speechSynthesis.cancel();

      if (typeof window.speechSynthesis.removeEventListener === "function") {
        window.speechSynthesis.removeEventListener("voiceschanged", this.handleVoicesChanged);
      } else {
        window.speechSynthesis.onvoiceschanged = null;
      }
    }
  }

  function friendlySpeechError(code) {
    switch (code) {
      case "not-allowed":
        return "Your browser needs a tap on Play before it can read aloud.";
      case "audio-busy":
        return "Another app is using the speaker. Close it and try again.";
      case "language-unavailable":
      case "voice-unavailable":
        return "This device does not have a compatible reading voice installed.";
      case "network":
        return "The reading voice needs a connection right now. Try again in a moment.";
      default:
        return "The read-along could not start. You can still enjoy reading the page.";
    }
  }

  /* Public API used by app.js and easy to exercise from the console. */
  window.ReadlingsAudio = ReadlingsAudio;
  window.ReadlingsAudioTools = {
    DEFAULT_RATE: DEFAULT_RATE,
    DEFAULT_PITCH: DEFAULT_PITCH,
    MIN_RATE: MIN_RATE,
    MAX_RATE: MAX_RATE,
    scoreVoice: scoreVoice,
    selectBestVoice: selectBestVoice,
    getAvailableVoices: getAvailableVoices,
    speechIsSupported: speechIsSupported
  };
})();
