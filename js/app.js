/* ==========================================================================
   Readlings — application logic
   --------------------------------------------------------------------------
   One small, dependency-free script for two pages:

   • index.html  — generated level cards, book nook, progress trail & dialog
   • reader.html — chapter renderer, read-along audio, typography, stars,
                   line focus, chapter navigation and print editions

   The curriculum lives in data/curriculum.js. Everything else is built here.
   ========================================================================== */

(function () {
  "use strict";

  var DATA = window.READLINGS_CURRICULUM;
  var STORAGE_PROGRESS = "readlings.progress.v1";
  var STORAGE_PREFS = "readlings.prefs.v1";

  var FONT_SIZES = [1.12, 1.25, 1.4, 1.6, 1.85];
  var FONT_SIZE_LABELS = ["Small", "Cosy", "Standard", "Large", "Extra large"];
  var RATE_VALUES = [0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];

  var FONTS = {
    lexend: { label: "Lexend", stack: "var(--font-ui)" },
    comic: { label: "Comic Neue", stack: "var(--font-comic)" },
    dyslexic: { label: "OpenDyslexic", stack: "var(--font-dyslexic)" }
  };

  var LEVEL_LINES = {
    0: "#F0D988",
    1: "#F4C7C7",
    2: "#A9E5EF",
    3: "#A9E8CE",
    4: "#DCCBFA",
    5: "#FDE68A",
    6: "#FBCFE8"
  };

  var DEFAULT_PREFS = {
    font: "lexend",
    sizeIndex: 2,
    rate: 0.65,
    lineFocus: false,
    voiceName: ""
  };

  var WORD_PATTERN = /[A-Za-z0-9]+(?:[’'\-][A-Za-z0-9]+)*/g;

  /* A small, research-informed high-frequency (sight) word list used to
     build the pre-reading primer. These are the words early readers meet
     most often, so practising them first lowers cognitive load. */
  var SIGHT_WORDS = [
    "a", "and", "away", "big", "blue", "can", "come", "down", "find", "for",
    "funny", "go", "help", "here", "i", "in", "is", "it", "jump", "little",
    "look", "make", "me", "my", "not", "one", "play", "red", "run", "said",
    "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you",
    "has", "have", "like", "no", "so", "was", "with", "he", "she", "they"
  ];

  /* Shared state */
  var books = [];
  var chapters = [];
  var bookById = Object.create(null);
  var chapterByKey = Object.create(null);
  var progress;
  var prefs;
  var audio = null;
  var currentAudioState = "idle";
  var activeWordEl = null;
  var focusedPageEl = null;
  var audioContent = { text: "", words: [] };
  var currentBook = null;
  var currentChapter = null;
  var toastTimer = null;
  var celebrationTimer = null;

  /* ------------------------------------------------------------------------
     Boot & data
     ------------------------------------------------------------------------ */

  if (!DATA || !Array.isArray(DATA.levels)) {
    whenReady(function () {
      showDataProblem("The story data could not be loaded. Please refresh the page and try again.");
    });
    return;
  }

  initCurriculum();
  progress = loadProgress();
  prefs = loadPrefs();

  window.ReadlingsApp = {
    books: books,
    chapters: chapters,
    getProgress: function () { return progress; },
    getPrefs: function () { return prefs; },
    getCurrentChapter: function () { return currentChapter; },
    getAudioContent: function () { return audioContent; },
    getAudio: function () { return audio; }
  };

  whenReady(start);

  function whenReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function start() {
    var page = document.body.getAttribute("data-page");

    try {
      if (page === "home") {
        initHome();
      } else if (page === "reader") {
        initReader();
      }
    } catch (error) {
      console.error("Readlings could not start:", error);
      showDataProblem("Something got tangled in the storybook. Please refresh and try again.");
    }
  }

  function initCurriculum() {
    var bookIndex = 0;

    DATA.levels.forEach(function (level) {
      var levelBooks = Array.isArray(level.books) ? level.books : [];

      levelBooks.forEach(function (book) {
        book.levelData = level;
        book.index = bookIndex;
        book.chapters = Array.isArray(book.chapters) ? book.chapters : [];
        book.chapterCount = book.chapters.length;
        book.minutes = book.chapters.reduce(function (sum, chapter) {
          return sum + (Number(chapter.minutes) || 0);
        }, 0);

        books.push(book);
        bookById[book.id] = book;
        bookIndex += 1;

        book.chapters.forEach(function (chapter, index) {
          chapter.book = book;
          chapter.levelData = level;
          chapter.chapterIndex = index;
          chapter.number = index + 1;
          chapter.key = book.id + "/" + chapter.id;
          chapter.globalIndex = chapters.length;
          chapter.wordCount = countWords((chapter.paragraphs || []).join(" "));

          chapters.push(chapter);
          chapterByKey[chapter.key] = chapter;
        });
      });
    });
  }

  function countWords(text) {
    var matches = String(text || "").match(WORD_PATTERN);
    return matches ? matches.length : 0;
  }

  /* ------------------------------------------------------------------------
     Storage
     ------------------------------------------------------------------------ */

  function readJson(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function loadProgress() {
    var raw = readJson(STORAGE_PROGRESS, null);
    var clean = { completed: {}, lastRead: null };

    if (!raw || typeof raw !== "object") {
      return clean;
    }

    if (Array.isArray(raw.completed)) {
      raw.completed.forEach(function (key) {
        if (chapterByKey[key]) {
          clean.completed[key] = true;
        }
      });
    } else if (raw.completed && typeof raw.completed === "object") {
      Object.keys(raw.completed).forEach(function (key) {
        if (chapterByKey[key] && raw.completed[key]) {
          clean.completed[key] = raw.completed[key];
        }
      });
    }

    if (raw.lastRead && typeof raw.lastRead === "object") {
      var lastKey = raw.lastRead.bookId + "/" + raw.lastRead.chapterId;
      var lastChapter = chapterByKey[lastKey];

      if (lastChapter && lastChapter.book.id === raw.lastRead.bookId) {
        clean.lastRead = {
          bookId: lastChapter.book.id,
          chapterId: lastChapter.id,
          at: raw.lastRead.at || null
        };
      }
    }

    return clean;
  }

  function saveProgress() {
    writeJson(STORAGE_PROGRESS, progress);
  }

  function loadPrefs() {
    var raw = readJson(STORAGE_PREFS, null);
    var clean = {
      font: DEFAULT_PREFS.font,
      sizeIndex: DEFAULT_PREFS.sizeIndex,
      rate: DEFAULT_PREFS.rate,
      lineFocus: false,
      voiceName: ""
    };

    if (!raw || typeof raw !== "object") {
      return clean;
    }

    if (Object.prototype.hasOwnProperty.call(FONTS, raw.font)) {
      clean.font = raw.font;
    }

    if (Number.isFinite(Number(raw.sizeIndex))) {
      clean.sizeIndex = clamp(Math.round(Number(raw.sizeIndex)), 0, FONT_SIZES.length - 1);
    }

    if (Number.isFinite(Number(raw.rate))) {
      clean.rate = nearestRate(Number(raw.rate));
    }

    clean.lineFocus = Boolean(raw.lineFocus);

    if (typeof raw.voiceName === "string") {
      clean.voiceName = raw.voiceName;
    }

    return clean;
  }

  function savePrefs() {
    writeJson(STORAGE_PREFS, prefs);
  }

  function nearestRate(value) {
    var target = clamp(value, 0.65, 1);
    var closest = RATE_VALUES[0];

    RATE_VALUES.forEach(function (rate) {
      if (Math.abs(rate - target) < Math.abs(closest - target)) {
        closest = rate;
      }
    });

    return closest;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  /* ------------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------------ */

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function icon(name, className) {
    return '<svg class="icon' + (className ? " " + className : "") + '" aria-hidden="true"><use href="#icon-' + name + '"></use></svg>';
  }

  function plural(word, count) {
    return count === 1 ? word : word + "s";
  }

  function languageGroupLabel(lang) {
    var code = String(lang || "").toLowerCase();
    var parts = code.split("-");
    var base = parts[0] || "en";
    var region = parts.length > 1 ? parts[1].toUpperCase() : "";
    var name = base === "en" ? "English" : base.charAt(0).toUpperCase() + base.slice(1);
    return region ? name + " · " + region : name;
  }

  function voiceSelectLabel(voice) {
    var tools = window.ReadlingsAudioTools || {};
    var label = typeof tools.cleanVoiceName === "function"
      ? tools.cleanVoiceName(voice.name)
      : String(voice.name || "");
    var gender = typeof tools.inferVoiceGender === "function" ? tools.inferVoiceGender(voice) : "";

    if (gender === "female") {
      return label + " · Female";
    }
    if (gender === "male") {
      return label + " · Male";
    }
    return label;
  }

  function populateVoiceSelect() {
    var select = document.getElementById("audio-voice");
    if (!select) {
      return;
    }

    var voices = audio
      ? audio.getVoices()
      : (window.ReadlingsAudioTools ? window.ReadlingsAudioTools.getEnglishVoices() : []);

    var groups = Object.create(null);

    voices.forEach(function (voice) {
      var key = String((voice && voice.lang) || "").toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(groups, key)) {
        groups[key] = [];
      }
      groups[key].push(voice);
    });

    var html = '<option value="">Automatic · warmest voice</option>';

    Object.keys(groups).sort().forEach(function (groupKey) {
      html += '<optgroup label="' + escapeHtml(languageGroupLabel(groupKey)) + '">';
      groups[groupKey].forEach(function (voice) {
        html += '<option value="' + escapeHtml(voice.name) + '">' + escapeHtml(voiceSelectLabel(voice)) + '</option>';
      });
      html += '</optgroup>';
    });

    select.innerHTML = html;

    if (prefs && typeof prefs.voiceName === "string" && prefs.voiceName) {
      select.value = prefs.voiceName;
    } else {
      select.value = "";
    }
  }

  function chapterUrl(chapter) {
    return "reader.html?book=" + encodeURIComponent(chapter.book.id) + "&chapter=" + encodeURIComponent(chapter.id);
  }

  function printHeader(chapter) {
    return "Readlings — " + chapter.book.title + ": " + chapter.title + " (Level " + chapter.levelData.id + ")";
  }

  function isComplete(chapter) {
    return Boolean(chapter && progress.completed[chapter.key]);
  }

  function getCompletedCount() {
    return chapters.reduce(function (total, chapter) {
      return total + (isComplete(chapter) ? 1 : 0);
    }, 0);
  }

  function getBookStats(book) {
    var done = book.chapters.reduce(function (total, chapter) {
      return total + (isComplete(chapter) ? 1 : 0);
    }, 0);

    return {
      done: done,
      total: book.chapters.length,
      complete: book.chapters.length > 0 && done === book.chapters.length
    };
  }

  function getLevelStats(level) {
    var done = 0;
    var total = 0;

    level.books.forEach(function (book) {
      book.chapters.forEach(function (chapter) {
        total += 1;
        if (isComplete(chapter)) {
          done += 1;
        }
      });
    });

    return { done: done, total: total };
  }

  function getContinueChapter(book) {
    if (!book.chapters.length) {
      return null;
    }

    if (progress.lastRead && progress.lastRead.bookId === book.id) {
      var lastChapter = chapterByKey[book.id + "/" + progress.lastRead.chapterId];

      if (lastChapter) {
        if (!isComplete(lastChapter)) {
          return lastChapter;
        }

        for (var i = lastChapter.chapterIndex + 1; i < book.chapters.length; i += 1) {
          if (!isComplete(book.chapters[i])) {
            return book.chapters[i];
          }
        }
      }
    }

    for (var j = 0; j < book.chapters.length; j += 1) {
      if (!isComplete(book.chapters[j])) {
        return book.chapters[j];
      }
    }

    return book.chapters[0];
  }

  function getTrailTarget() {
    if (!chapters.length) {
      return null;
    }

    var lastChapter = null;

    if (progress.lastRead) {
      lastChapter = chapterByKey[progress.lastRead.bookId + "/" + progress.lastRead.chapterId] || null;
    }

    if (lastChapter) {
      if (!isComplete(lastChapter)) {
        return lastChapter;
      }

      for (var i = lastChapter.globalIndex + 1; i < chapters.length; i += 1) {
        if (!isComplete(chapters[i])) {
          return chapters[i];
        }
      }
    }

    for (var j = 0; j < chapters.length; j += 1) {
      if (!isComplete(chapters[j])) {
        return chapters[j];
      }
    }

    return lastChapter || chapters[0];
  }

  function prefersReducedMotion() {
    return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function updateGlobalCounts() {
    var completed = getCompletedCount();

    document.querySelectorAll("[data-completed-count]").forEach(function (element) {
      element.textContent = String(completed);
    });

    document.querySelectorAll("[data-total-chapters]").forEach(function (element) {
      element.textContent = String(chapters.length);
    });

    document.querySelectorAll("[data-current-year]").forEach(function (element) {
      element.textContent = String(new Date().getFullYear());
    });
  }

  function showToast(message, duration) {
    var toast = document.getElementById("toast");

    if (!toast) {
      return;
    }

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");

    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, typeof duration === "number" ? duration : 3400);
  }

  function openDialog(dialog) {
    if (!dialog || dialog.open) {
      return;
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    document.body.classList.add("modal-open");
  }

  function closeDialog(dialog) {
    if (!dialog) {
      return;
    }

    document.body.classList.remove("modal-open");

    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  function installDialogDismissal(dialog) {
    if (!dialog) {
      return;
    }

    dialog.addEventListener("close", function () {
      document.body.classList.remove("modal-open");
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeDialog(dialog);
      }
    });
  }

  function showDataProblem(message) {
    var main = document.getElementById("main-content");

    if (!main) {
      return;
    }

    main.innerHTML =
      '<div class="container" style="padding: 4rem 0;">' +
        '<div class="empty-state" role="alert">' +
          '<h1 style="margin-bottom: 0.75rem;">The story basket is missing</h1>' +
          '<p style="margin-bottom: 1.4rem;">' + escapeHtml(message) + '</p>' +
          '<a class="btn btn--primary" href="index.html">Open the library</a>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------------
     Homepage
     ------------------------------------------------------------------------ */

  function initHome() {
    var levelGrid = document.getElementById("level-grid");
    var bookGrid = document.getElementById("book-grid");
    var levelSection = document.getElementById("levels");
    var catalogStatus = document.getElementById("catalog-status");
    var clearFilter = document.getElementById("clear-level-filter");
    var filterHint = document.getElementById("filter-hint");
    var dialog = document.getElementById("book-dialog");
    var dialogContent = document.getElementById("book-dialog-content");
    var dialogClose = document.getElementById("book-dialog-close");

    if (!levelGrid || !bookGrid) {
      return;
    }

    var activeLevel = null;
    var dialogBookId = null;

    renderLevelCards();
    renderCatalog();
    renderTrail();
    updateGlobalCounts();
    installDialogDismissal(dialog);

    levelGrid.addEventListener("click", function (event) {
      var card = event.target.closest("[data-level]");

      if (!card) {
        return;
      }

      var levelId = Number(card.getAttribute("data-level"));
      activeLevel = activeLevel === levelId ? null : levelId;

      renderLevelCards();
      renderCatalog();

      if (activeLevel !== null) {
        var selected = levelGrid.querySelector('[data-level="' + activeLevel + '"]');
        if (selected) {
          selected.focus({ preventScroll: true });
        }
        var librarySection = document.getElementById("library");
        if (librarySection) {
          librarySection.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        }
      }
    });

    clearFilter.addEventListener("click", function () {
      activeLevel = null;
      renderLevelCards();
      renderCatalog();
      if (levelSection) {
        levelSection.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      }
    });

    bookGrid.addEventListener("click", function (event) {
      var chaptersButton = event.target.closest("[data-open-book]");

      if (!chaptersButton) {
        return;
      }

      event.preventDefault();
      openBook(dialogBookId = chaptersButton.getAttribute("data-open-book"));
    });

    if (dialogClose) {
      dialogClose.addEventListener("click", function () {
        closeDialog(dialog);
      });
    }

    function openBook(bookId) {
      var book = bookById[bookId];

      if (!book || !dialogContent) {
        return;
      }

      dialogContent.innerHTML = buildBookDialog(book, null, "book-dialog-title", "home");
      openDialog(dialog);

      if (dialogClose) {
        dialogClose.focus({ preventScroll: true });
      }
    }

    function renderLevelCards() {
      levelGrid.innerHTML = DATA.levels.map(function (level) {
        var stats = getLevelStats(level);
        var pressed = activeLevel === level.id;
        var percent = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
        var bookLabel = level.books.length + " " + plural("book", level.books.length);
        var chapterLabel = stats.total + " " + plural("chapter", stats.total);

        return (
          '<button class="level-card" type="button" data-level="' + level.id + '" data-number="L' + level.id + '" ' +
            'aria-pressed="' + pressed + '" ' +
            'style="--card-color: ' + escapeHtml(level.color) + "; --card-soft: " + escapeHtml(level.soft) +
              "; --card-ink: " + escapeHtml(level.ink) + ';">' +
            '<span class="level-card__top">' +
              '<span class="level-card__icon">' + icon(level.icon) + '</span>' +
              '<span class="level-card__number">Level ' + level.id + '</span>' +
            '</span>' +
            '<span class="level-card__category">' + escapeHtml(level.category) + '</span>' +
            '<span class="level-card__title">' + escapeHtml(level.name) + '</span>' +
            '<span class="level-card__description">' + escapeHtml(level.description) + '</span>' +
            '<span class="level-card__footer">' +
              '<span class="level-card__meta"><span>' + bookLabel + ' · ' + chapterLabel + '</span>' +
                '<span>' + stats.done + '/' + stats.total + ' ★</span></span>' +
              '<span class="level-card__progress"><span style="width: ' + percent + '%;"></span></span>' +
            '</span>' +
          '</button>'
        );
      }).join("");
    }

    function renderCatalog() {
      var visibleBooks = activeLevel === null
        ? books
        : books.filter(function (book) { return book.levelData.id === activeLevel; });
      var level = activeLevel === null
        ? null
        : DATA.levels.filter(function (item) { return item.id === activeLevel; })[0];

      if (activeLevel !== null && !level) {
        activeLevel = null;
        visibleBooks = books;
      }

      clearFilter.hidden = activeLevel === null;

      if (catalogStatus) {
        catalogStatus.innerHTML = level
          ? 'Showing <strong>' + visibleBooks.length + '</strong> ' + plural("book", visibleBooks.length) +
            ' at <strong>Level ' + level.id + ' · ' + escapeHtml(level.name) + '</strong>'
          : 'Showing <strong>all ' + visibleBooks.length + '</strong> books';
      }

      if (filterHint) {
        filterHint.innerHTML = level
          ? icon("sparkle") + " Level " + level.id + " selected. Tap the card again or choose <strong>All levels</strong> to see every book."
          : icon("sparkle") + " Tap a level card to filter the book nook.";
      }

      bookGrid.innerHTML = visibleBooks.length
        ? visibleBooks.map(renderBookCard).join("")
        : '<p class="empty-state">No books in this level just yet. Try another reading step!</p>';

      if (typeof levelSection !== "undefined" && levelSection) {
        levelSection.setAttribute("data-filtered", activeLevel === null ? "false" : "true");
      }
    }

    function renderBookCard(book) {
      var stats = getBookStats(book);
      var level = book.levelData;
      var nextChapter = getContinueChapter(book);
      var href = nextChapter ? chapterUrl(nextChapter) : "index.html#library";
      var actionLabel = stats.done === 0
        ? "Start reading"
        : stats.complete
          ? "Read again"
          : "Continue";
      var stars = book.chapters.map(function (chapter) {
        return '<span class="book-progress__star' + (isComplete(chapter) ? " is-earned" : "") + '" aria-hidden="true">' +
          icon("star") + '</span>';
      }).join("");
      var sticker = stats.complete
        ? '<span class="book-cover__sticker">' + icon("check") + ' All stars</span>'
        : "";

      return (
        '<article class="book-card" style="--card-index: ' + book.index + ';">' +
          '<div class="book-cover" style="--cover-color: ' + escapeHtml(level.color) + "; --cover-soft: " +
            escapeHtml(level.soft) + "; --cover-ink: " + escapeHtml(level.ink) + ';">' +
            '<div class="book-cover__top">' +
              '<span class="cover-series">' + icon("book-open") + ' Readlings</span>' +
              (stats.complete ? "" : '<span class="cover-level">Level ' + level.id + '</span>') +
            '</div>' +
            '<div class="cover-art" aria-hidden="true">' +
              '<span class="cover-emoji">' + escapeHtml(book.emoji) + '</span>' +
              '<span class="cover-star cover-star--one">✦</span>' +
              '<span class="cover-star cover-star--two">★</span>' +
            '</div>' +
            '<div class="book-cover__title">' +
              '<h3>' + escapeHtml(book.title) + '</h3>' +
              '<p>' + escapeHtml(book.kicker) + '</p>' +
            '</div>' +
            sticker +
          '</div>' +
          '<div class="book-info">' +
            '<div class="book-info__topline">' +
              '<span class="book-level-chip">Level ' + level.id + ' · ' + escapeHtml(level.category) + '</span>' +
              '<span>' + book.chapters.length + ' ' + plural("chapter", book.chapters.length) + '</span>' +
            '</div>' +
            '<p class="book-info__blurb">' + escapeHtml(book.blurb) + '</p>' +
            '<div class="book-skills" aria-label="Reading skills">' +
              book.skills.map(function (skill) { return '<span>' + escapeHtml(skill) + '</span>'; }).join("") +
            '</div>' +
            '<div class="book-progress">' +
              '<span class="book-progress__stars" role="img" aria-label="' + stats.done + ' of ' +
                stats.total + ' stars collected">' + stars + '</span>' +
              '<span class="book-progress__label">' + stats.done + '/' + stats.total + ' stars</span>' +
            '</div>' +
            '<div class="book-actions">' +
              '<a class="btn btn--primary btn--small" href="' + escapeHtml(href) + '">' +
                actionLabel + icon("arrow-right") +
              '</a>' +
              '<button class="btn btn--ghost btn--small btn--chapters" type="button" data-open-book="' +
                escapeHtml(book.id) + '" aria-label="See all chapters in ' + escapeHtml(book.title) + '">' +
                icon("chapters") + ' Chapters' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    function renderTrail() {
      var total = chapters.length;
      var done = getCompletedCount();
      var target = getTrailTarget();
      var trailTitle = document.getElementById("trail-title");
      var trailCopy = document.getElementById("trail-copy");
      var progressbar = document.getElementById("trail-progressbar");
      var progressFill = document.getElementById("trail-progress-fill");
      var nextBook = document.getElementById("trail-next-book");
      var nextChapter = document.getElementById("trail-next-chapter");
      var continueButton = document.getElementById("trail-continue");
      var nextEyebrow = document.querySelector(".trail-next__eyebrow");
      var percent = total ? Math.round((done / total) * 100) : 0;

      if (trailTitle) {
        if (done === 0) {
          trailTitle.textContent = "Ready for your first story?";
        } else if (done === total && total > 0) {
          trailTitle.textContent = "A whole library of stars!";
        } else {
          trailTitle.textContent = done + " " + plural("star", done) + " collected — keep going!";
        }
      }

      if (trailCopy) {
        if (done === 0) {
          trailCopy.textContent = "Finish a chapter to collect a star. Every star is a little “I did it!”";
        } else if (done === total && total > 0) {
          trailCopy.textContent = "You finished every Readlings chapter. Open any favourite for a cosy reread.";
        } else {
          trailCopy.textContent = "Your next little adventure is waiting. A few calm minutes is all it takes.";
        }
      }

      if (progressbar) {
        progressbar.setAttribute("aria-valuemax", String(total));
        progressbar.setAttribute("aria-valuenow", String(done));
      }

      if (progressFill) {
        progressFill.style.width = percent + "%";
      }

      if (target) {
        if (nextBook) {
          nextBook.textContent = target.book.title;
        }
        if (nextChapter) {
          nextChapter.textContent = target.title;
        }
        if (continueButton) {
          continueButton.href = chapterUrl(target);
          var label = done === 0
            ? "Start reading"
            : done === total && total > 0
              ? "Read a favourite"
              : "Continue reading";
          continueButton.innerHTML = escapeHtml(label) + icon("arrow-right");
        }
      }

      if (nextEyebrow) {
        nextEyebrow.textContent = done === total && total > 0 ? "A favourite" : "Up next";
      }
    }

    window.addEventListener("storage", function (event) {
      if (!event.key || event.key === STORAGE_PROGRESS) {
        progress = loadProgress();
        renderLevelCards();
        renderCatalog();
        renderTrail();
        updateGlobalCounts();

        if (dialog && dialog.open && dialogBookId && bookById[dialogBookId]) {
          dialogContent.innerHTML = buildBookDialog(bookById[dialogBookId], null, "book-dialog-title", "home");
        }
      }
    });
  }

  function buildBookDialog(book, currentKey, titleId, context) {
    var level = book.levelData;
    var stats = getBookStats(book);
    var startChapter = getContinueChapter(book);
    var startLabel = stats.done === 0
      ? "Start reading"
      : stats.complete
        ? "Read again"
        : "Continue reading";
    var totalMinutes = book.minutes;
    var chapterLinks = book.chapters.map(function (chapter) {
      var complete = isComplete(chapter);
      var current = currentKey === chapter.key;
      var status = "";

      if (complete) {
        status = '<span class="dialog-chapter__status is-complete">' + icon("star") + ' Read</span>';
      } else if (current) {
        status = '<span class="dialog-chapter__status">Now</span>';
      }

      return (
        '<div class="dialog-chapter-row">' +
          '<a class="dialog-chapter" href="' + escapeHtml(chapterUrl(chapter)) + '"' +
            (current ? ' aria-current="page"' : "") + '>' +
            '<span class="dialog-chapter__number">' + chapter.number + '</span>' +
            '<span class="dialog-chapter__copy">' +
              '<strong>' + escapeHtml(chapter.title) + '</strong>' +
              '<small>' + escapeHtml(chapter.summary) + '</small>' +
            '</span>' +
            status +
            icon("arrow-right") +
          '</a>' +
          '</div>'
      );
    }).join("");
    var footerAction = context === "reader" || !startChapter
      ? '<a class="btn btn--ghost btn--small" href="index.html#library">' + icon("book-open") + ' Book nook</a>'
      : '<a class="btn btn--primary btn--small" href="' + escapeHtml(chapterUrl(startChapter)) + '">' +
          escapeHtml(startLabel) + icon("arrow-right") + '</a>';

    return (
      '<div class="dialog-cover" style="--dialog-color: ' + escapeHtml(level.color) + "; --dialog-soft: " +
        escapeHtml(level.soft) + "; --dialog-ink: " + escapeHtml(level.ink) + ';">' +
        '<span class="dialog-cover__emoji" aria-hidden="true">' + escapeHtml(book.emoji) + '</span>' +
        '<div class="dialog-cover__copy">' +
          '<p class="dialog-kicker">Readlings · Level ' + level.id + ' · ' + escapeHtml(level.category) + '</p>' +
          '<h2 id="' + escapeHtml(titleId) + '">' + escapeHtml(book.title) + '</h2>' +
          '<p>' + escapeHtml(book.blurb) + '</p>' +
          '<div class="dialog-stats">' +
            '<span>' + book.chapters.length + ' ' + plural("chapter", book.chapters.length) + '</span>' +
            '<span>About ' + totalMinutes + ' min</span>' +
            '<span>' + stats.done + '/' + stats.total + ' stars</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="dialog-body">' +
        '<div class="dialog-body__heading">' +
          '<h3>Choose a chapter</h3>' +
          '<span>' + stats.done + ' of ' + stats.total + ' stars collected</span>' +
        '</div>' +
        '<nav class="dialog-chapter-list" aria-label="Chapters in ' + escapeHtml(book.title) + '">' +
          chapterLinks +
        '</nav>' +
        '<div class="dialog-footer">' +
          '<p class="dialog-footer__note">Level focus: ' + escapeHtml(level.focus.join(", ")) + '.</p>' +
          footerAction +
        '</div>' +
      '</div>'
    );
  }

  /* ------------------------------------------------------------------------
     Reader — setup & chapter rendering
     ------------------------------------------------------------------------ */

  function initReader() {
    resolveReaderChapter();

    if (!currentBook || !currentChapter) {
      renderReaderError();
      return;
    }

    applyLevelTheme(currentChapter.levelData);
    applyPreferences();
    renderReaderChapter();
    renderSidebar();
    renderCompletion();
    renderPager();
    updateGlobalCounts();
    setupReaderControls();
    initReadAlong();
    setupWordTapToDecode();
    setupPageFocus();
    rememberLastRead();
    showPrimer();

    window.addEventListener("storage", function (event) {
      if (!event.key || event.key === STORAGE_PROGRESS) {
        progress = loadProgress();
        updateGlobalCounts();
        renderHeroBadges();
        renderSidebar();
        renderCompletion();
      }
    });

    window.addEventListener("pagehide", function () {
      if (audio) {
        audio.destroy();
      }
    });

    var focusBandScrollFrame = null;
    function scheduleFocusBandSync() {
      if (focusBandScrollFrame !== null) {
        return;
      }
      focusBandScrollFrame = window.requestAnimationFrame(function () {
        focusBandScrollFrame = null;
        syncFocusBandOnScroll();
      });
    }

    window.addEventListener("scroll", scheduleFocusBandSync, { passive: true });
    window.addEventListener("resize", function () {
      if (document.body.classList.contains("line-focus-on")) {
        if (activeWordEl && currentAudioState === "playing") {
          focusBandVariables(activeWordEl);
        } else if (focusedPageEl) {
          focusBandVariables(focusedPageEl);
        } else {
          updateFocusBandToCenter();
        }
      }
    });
  }

  function syncFocusBandOnScroll() {
    if (!document.body.classList.contains("line-focus-on")) {
      return;
    }

    if (activeWordEl && currentAudioState === "playing") {
      focusBandVariables(activeWordEl);
    } else if (focusedPageEl) {
      focusBandVariables(focusedPageEl);
    } else {
      var target = focusBandTargetFromPoint();
      if (target) {
        focusBandVariables(target);
      } else {
        updateFocusBandToCenter();
      }
    }
  }

  function resolveReaderChapter() {
    var params = new URLSearchParams(window.location.search);
    var requestedBookId = params.get("book");
    var requestedChapterId = params.get("chapter");
    var book = requestedBookId ? bookById[requestedBookId] : null;
    var chapter = book && requestedChapterId
      ? chapterByKey[book.id + "/" + requestedChapterId] || null
      : null;
    var usedFallback = false;

    if (!book) {
      book = progress.lastRead && bookById[progress.lastRead.bookId]
        ? bookById[progress.lastRead.bookId]
        : books[0] || null;
      usedFallback = true;
    }

    if (!book) {
      return;
    }

    if (!chapter) {
      if (progress.lastRead && progress.lastRead.bookId === book.id) {
        chapter = chapterByKey[book.id + "/" + progress.lastRead.chapterId] || null;
      }

      if (!chapter) {
        chapter = book.chapters[0] || null;
      }

      usedFallback = true;
    }

    currentBook = book;
    currentChapter = chapter;

    if (usedFallback) {
      canonicalizeReaderUrl(book, chapter);
    }
  }

  function canonicalizeReaderUrl(book, chapter) {
    if (!book || !chapter) {
      return;
    }

    try {
      var url = new URL(window.location.href);
      url.searchParams.set("book", book.id);
      url.searchParams.set("chapter", chapter.id);
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (error) {
      /* file:// or an older browser: the page still works without a tidy URL. */
    }
  }

  function applyLevelTheme(level) {
    var root = document.documentElement;

    root.style.setProperty("--level-color", level.color);
    root.style.setProperty("--level-soft", level.soft);
    root.style.setProperty("--level-ink", level.ink);
    root.style.setProperty("--level-line", LEVEL_LINES[level.id] || "#F0D988");
  }

  function applyPreferences() {
    setReaderFont(prefs.font, false);
    setReaderSize(prefs.sizeIndex, false);
    setLineFocus(prefs.lineFocus, false, false);

    var rateSelect = document.getElementById("audio-rate");
    if (rateSelect) {
      rateSelect.value = String(prefs.rate);
    }

    var voiceSelect = document.getElementById("audio-voice");
    if (voiceSelect) {
      voiceSelect.value = prefs.voiceName || "";
    }
  }

  function renderReaderChapter() {
    var chapter = currentChapter;
    var book = currentBook;
    var level = chapter.levelData;
    var cover = document.getElementById("chapter-cover");
    var title = document.getElementById("chapter-title");
    var summary = document.getElementById("chapter-summary");
    var meta = document.getElementById("chapter-meta");
    var breadcrumbBook = document.getElementById("breadcrumb-book");
    var breadcrumbChapter = document.getElementById("breadcrumb-chapter");
    var printRunningHeader = document.getElementById("print-running-header");

    document.title = chapter.title + " — " + book.title + " — Readlings";

    if (cover) {
      cover.textContent = book.emoji;
    }

    if (title) {
      title.textContent = chapter.title;
    }

    if (summary) {
      summary.textContent = chapter.summary;
    }

    if (breadcrumbBook) {
      breadcrumbBook.textContent = book.title;
      breadcrumbBook.href = "index.html#library";
      breadcrumbBook.title = "Back to the book nook";
    }

    if (breadcrumbChapter) {
      breadcrumbChapter.textContent = chapter.title;
    }

    if (meta) {
      meta.innerHTML =
        '<span>' + icon("clock") + ' ' + chapter.minutes + ' min read</span>' +
        '<span>' + icon("book-open") + ' ' + chapter.wordCount + ' words</span>' +
        '<span>' + icon("speaker") + ' Read-along ready</span>';
    }

    if (printRunningHeader) {
      printRunningHeader.textContent = printHeader(chapter);
    }

    renderHeroBadges();
    audioContent = renderChapterBody(chapter, level);
  }

  function renderHeroBadges() {
    var badges = document.getElementById("chapter-badges");

    if (!badges || !currentChapter) {
      return;
    }

    var chapter = currentChapter;
    var level = chapter.levelData;

    badges.innerHTML =
      '<span class="level-badge">' + icon(level.icon) + ' Level ' + level.id + ' · ' + escapeHtml(level.category) + '</span>' +
      '<span class="chapter-badge">Chapter ' + chapter.number + ' of ' + currentBook.chapters.length + '</span>' +
      (isComplete(chapter)
        ? '<span class="chapter-badge">' + icon("star") + ' Star collected</span>'
        : "");
  }

  function renderChapterBody(chapter, level) {
    var body = document.getElementById("chapter-body");
    var words = [];
    var paragraphs = chapter.paragraphs || [];
    var spokenText = paragraphs.join("\n\n");
    var cursor = 0;

    if (!body) {
      return { text: spokenText, words: words, chapterId: chapter.id, chapterKey: chapter.key, bookId: chapter.book.id };
    }

    body.innerHTML = "";

    paragraphs.forEach(function (text, index) {
      if (index > 0) {
        cursor += 2;
      }

      var paragraph = document.createElement("p");
      paragraph.className = "story-paragraph";

      appendWordSpans(paragraph, text, cursor, words);

      if (level.id === 0) {
        var page = document.createElement("div");
        var pageNumber = document.createElement("span");

        page.className = "story-page";
        pageNumber.className = "story-page__number";
        pageNumber.textContent = "Page " + (index + 1);

        page.appendChild(pageNumber);
        page.appendChild(paragraph);
        body.appendChild(page);
      } else {
        if (index === 0) {
          var wrapper = document.createElement("div");
          wrapper.className = "story-text";
          body.appendChild(wrapper);
        }

        body.querySelector(".story-text").appendChild(paragraph);
      }

      cursor += text.length;
    });

    return { text: spokenText, words: words, chapterId: chapter.id, chapterKey: chapter.key, bookId: chapter.book.id };
  }

  /**
   * Split a paragraph into highlightable word spans while recording the
   * exact character positions in the joined read-aloud string. Punctuation
   * and spacing stay outside the spans so only real words light up.
   */
  function appendWordSpans(paragraph, text, textStart, words) {
    var lastIndex = 0;
    var match;

    WORD_PATTERN.lastIndex = 0;

    while ((match = WORD_PATTERN.exec(text)) !== null) {
      if (match.index > lastIndex) {
        paragraph.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      var span = document.createElement("span");
      span.className = "word";
      span.setAttribute("data-word-index", String(words.length));
      span.textContent = match[0];

      paragraph.appendChild(span);
      words.push({
        start: textStart + match.index,
        end: textStart + match.index + match[0].length,
        element: span,
        text: match[0]
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      paragraph.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }

  function renderSidebar() {
    var sidebar = document.getElementById("chapter-sidebar");

    if (!sidebar || !currentBook || !currentChapter) {
      return;
    }

    var book = currentBook;
    var level = book.levelData;
    var stats = getBookStats(book);
    var percent = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    var chapterLinks = book.chapters.map(function (chapter) {
      var complete = isComplete(chapter);
      var current = chapter.key === currentChapter.key;

      return (
        '<div class="chapter-nav-row">' +
          '<a class="chapter-nav-link" href="' + escapeHtml(chapterUrl(chapter)) + '"' +
            (current ? ' aria-current="page"' : "") + '>' +
            '<span class="chapter-nav-link__number">' + chapter.number + '</span>' +
            '<span class="chapter-nav-link__text">' +
              '<strong>' + escapeHtml(chapter.title) + '</strong>' +
              '<small>' + chapter.minutes + ' min · ' + (complete ? "Finished" : "Ready to read") + '</small>' +
            '</span>' +
            '<span class="chapter-nav-link__status' + (complete ? " is-complete" : "") + '" aria-label="' +
              (complete ? "Star collected" : "No star yet") + '">' + icon("star") + '</span>' +
          '</a>' +
        '</div>'
      );
    }).join("");

    sidebar.innerHTML =
      '<div class="sidebar-card">' +
        '<div class="sidebar-book">' +
          '<span class="sidebar-cover" aria-hidden="true">' + escapeHtml(book.emoji) + '</span>' +
          '<div class="sidebar-book__copy">' +
            '<span class="sidebar-book__level">Level ' + level.id + ' · ' + escapeHtml(level.category) + '</span>' +
            '<strong class="sidebar-book__title">' + escapeHtml(book.title) + '</strong>' +
            '<span class="sidebar-book__author">A Readlings story</span>' +
          '</div>' +
        '</div>' +
        '<div class="sidebar-progress">' +
          '<div class="sidebar-progress__top"><span>Your stars</span><strong>' + stats.done + ' / ' + stats.total + '</strong></div>' +
          '<div class="sidebar-progress__track"><span class="sidebar-progress__fill" style="width: ' + percent + '%;"></span></div>' +
        '</div>' +
        '<nav class="chapter-nav-list" aria-label="Chapters in ' + escapeHtml(book.title) + '">' +
          chapterLinks +
        '</nav>' +
        '<div class="sidebar-footer">' +
          '<a href="index.html#library">' + icon("book-open") + ' Back to the book nook</a>' +
        '</div>' +
      '</div>' +
      '<div class="sidebar-tip">' +
        '<span class="sidebar-tip__icon">' + icon("heart") + '</span>' +
        '<strong>Grown-up tip</strong>' +
        '<p>' + escapeHtml(level.guidance) + '</p>' +
      '</div>';
  }

  function renderCompletion() {
    var zone = document.getElementById("completion-zone");

    if (!zone || !currentChapter) {
      return;
    }

    var chapter = currentChapter;
    var stats = getBookStats(currentBook);
    var complete = isComplete(chapter);
    var next = chapters[chapter.globalIndex + 1];
    var nextLabel = next && next.book.id !== currentBook.id ? "Next story" : "Next chapter";
    var action = complete
      ? next
        ? '<a class="btn btn--primary complete-button" href="' + escapeHtml(chapterUrl(next)) + '">' +
            nextLabel + " " + icon("arrow-right") + '</a>'
        : '<a class="btn btn--primary complete-button" href="index.html#library">More stories ' + icon("arrow-right") + '</a>'
      : '<button class="btn btn--primary complete-button" type="button" data-open-comprehension>' +
          icon("star") + ' I read this chapter</button>';

    zone.innerHTML =
      '<div class="completion-card' + (complete ? " is-complete" : "") + '">' +
        '<span class="completion-star" aria-hidden="true">' + icon("star") + '</span>' +
        '<div class="completion-copy">' +
          '<h2>' + (complete ? "Star collected!" : "Finished this chapter?") + '</h2>' +
          '<p>' + (complete
            ? stats.done + ' of ' + stats.total + ' stars in ' + escapeHtml(currentBook.title) + '. Lovely reading!'
            : "Tap below when you have read it. Every finished chapter earns a star.") + '</p>' +
        '</div>' +
        action +
      '</div>';
  }

  function renderPager() {
    var pager = document.getElementById("chapter-pager");

    if (!pager || !currentChapter) {
      return;
    }

    var previous = chapters[currentChapter.globalIndex - 1];
    var next = chapters[currentChapter.globalIndex + 1];

    pager.innerHTML =
      (previous
        ? '<a class="page-turn" href="' + escapeHtml(chapterUrl(previous)) + '">' +
            '<span class="page-turn__icon">' + icon("arrow-left") + '</span>' +
            '<span class="page-turn__copy"><small>' +
              (previous.book.id === currentBook.id ? "Previous chapter" : "Previous book") +
              '</small><strong>' + escapeHtml(previous.title) + '</strong></span>' +
          '</a>'
        : '<span class="page-turn page-turn--placeholder" aria-hidden="true"></span>') +
      (next
        ? '<a class="page-turn page-turn--next" href="' + escapeHtml(chapterUrl(next)) + '">' +
            '<span class="page-turn__copy"><small>' +
              (next.book.id === currentBook.id ? "Next chapter" : "Next book") +
              '</small><strong>' + escapeHtml(next.title) + '</strong></span>' +
            '<span class="page-turn__icon">' + icon("arrow-right") + '</span>' +
          '</a>'
        : '<span class="page-turn page-turn--placeholder" aria-hidden="true"></span>');
  }

  function renderReaderError() {
    var title = document.getElementById("chapter-title");
    var summary = document.getElementById("chapter-summary");
    var cover = document.getElementById("chapter-cover");
    var body = document.getElementById("chapter-body");
    var completion = document.getElementById("completion-zone");
    var toolbar = document.getElementById("reading-toolbar");
    var badges = document.getElementById("chapter-badges");
    var meta = document.getElementById("chapter-meta");

    document.title = "Story not found — Readlings";

    if (cover) {
      cover.textContent = "📚";
    }

    if (toolbar) {
      toolbar.hidden = true;
    }

    if (badges) {
      badges.innerHTML = "";
    }

    if (title) {
      title.textContent = "That story is taking a nap";
    }

    if (summary) {
      summary.textContent = "We could not find the chapter you asked for. Choose another story from the book nook.";
    }

    if (meta) {
      meta.innerHTML = "";
    }

    if (body) {
      body.innerHTML = '<p class="story-paragraph">Every book in Readlings is only a page away. ' +
        '<a href="index.html#library">Open the book nook</a> to pick a new adventure.</p>';
    }

    if (completion) {
      completion.innerHTML = '<a class="btn btn--primary" href="index.html#library">' + icon("book-open") + ' Choose a story</a>';
    }
  }

  /* ------------------------------------------------------------------------
     Reader — typography & line focus
     ------------------------------------------------------------------------ */

  function setReaderFont(font, shouldSave) {
    var nextFont = Object.prototype.hasOwnProperty.call(FONTS, font) ? font : DEFAULT_PREFS.font;
    var option;

    prefs.font = nextFont;
    document.body.setAttribute("data-reader-font", nextFont);
    document.documentElement.style.setProperty("--reading-font", FONTS[nextFont].stack);

    var pickerLabel = document.getElementById("font-picker-label");
    if (pickerLabel) {
      pickerLabel.textContent = FONTS[nextFont].label;
    }

    document.querySelectorAll("[data-font]").forEach(function (button) {
      option = button.getAttribute("data-font");
      button.setAttribute("aria-checked", option === nextFont ? "true" : "false");
    });

    if (shouldSave) {
      savePrefs();
    }
  }

  function setReaderSize(index, shouldSave) {
    var nextIndex = clamp(Math.round(Number(index) || 0), 0, FONT_SIZES.length - 1);
    var minus = document.getElementById("font-decrease");
    var plus = document.getElementById("font-increase");
    var live = document.getElementById("font-size-live");

    prefs.sizeIndex = nextIndex;
    document.documentElement.style.setProperty("--reader-font-size", FONT_SIZES[nextIndex] + "rem");

    if (live) {
      live.textContent = FONT_SIZE_LABELS[nextIndex] + " text size";
    }

    if (minus) {
      minus.disabled = nextIndex <= 0;
    }

    if (plus) {
      plus.disabled = nextIndex >= FONT_SIZES.length - 1;
    }

    if (shouldSave) {
      savePrefs();
    }
  }

  function setLineFocus(on, shouldSave, announce) {
    var enabled = Boolean(on);
    var toggle = document.getElementById("line-focus-toggle");

    prefs.lineFocus = enabled;
    document.body.classList.toggle("line-focus-on", enabled);

    if (toggle) {
      toggle.setAttribute("aria-pressed", enabled ? "true" : "false");
      toggle.title = enabled
        ? "Turn off line focus"
        : "Highlight one line at a time and dim the rest";
    }

    if (shouldSave) {
      savePrefs();
    }

    if (announce) {
      showToast(enabled ? "Line focus on — one calm line at a time." : "Line focus off. The whole page is bright again.", 2400);
    }

    if (enabled) {
      if (activeWordEl) {
        window.setTimeout(function () {
          activeWordEl.scrollIntoView({
            block: "center",
            behavior: prefersReducedMotion() ? "auto" : "smooth"
          });
          window.setTimeout(function () {
            updateFocusBand(activeWordEl);
          }, 90);
        }, 80);
      } else {
        updateFocusBandToCenter();
      }
    } else {
      focusedPageEl = null;
      clearFocusBand();
    }
  }

  function focusBandVariables(element) {
    if (!element) {
      return;
    }

    var rect = element.getBoundingClientRect();
    var padding = 6;
    var top = Math.max(0, rect.top - padding);
    var height = Math.max(24, rect.height + padding * 2);

    document.documentElement.style.setProperty("--focus-top", top + "px");
    document.documentElement.style.setProperty("--focus-height", height + "px");
  }

  function updateFocusBand(element) {
    if (!document.body.classList.contains("line-focus-on")) {
      return;
    }

    if (element) {
      focusBandVariables(element);
      return;
    }

    updateFocusBandToCenter();
  }

  function updateFocusBandToCenter() {
    if (!document.body.classList.contains("line-focus-on")) {
      return;
    }

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var bandHeight = 4.8 * 16;
    var top = Math.max(0, Math.round((viewportHeight - bandHeight) / 2));

    document.documentElement.style.setProperty("--focus-top", top + "px");
    document.documentElement.style.setProperty("--focus-height", bandHeight + "px");
  }

  function clearFocusBand() {
    document.documentElement.style.removeProperty("--focus-top");
    document.documentElement.style.removeProperty("--focus-height");
  }

  function focusBandTargetFromPoint() {
    if (!document.body.classList.contains("line-focus-on")) {
      return null;
    }

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var center = viewportHeight / 2;
    var element = document.elementFromPoint(window.innerWidth / 2, center);

    if (!element) {
      return null;
    }

    return element.closest ? element.closest(".word") : null;
  }

  /* ------------------------------------------------------------------------
     Reader — controls, menus, dialog & print
     ------------------------------------------------------------------------ */

  function setupReaderControls() {
    var fontButton = document.getElementById("font-picker-button");
    var fontMenu = document.getElementById("font-menu");
    var printButton = document.getElementById("print-menu-button");
    var printMenu = document.getElementById("print-menu");
    var fontDecrease = document.getElementById("font-decrease");
    var fontIncrease = document.getElementById("font-increase");
    var lineFocusToggle = document.getElementById("line-focus-toggle");
    var rateSelect = document.getElementById("audio-rate");
    var chaptersDialog = document.getElementById("chapters-dialog");
    var chaptersDialogContent = document.getElementById("chapters-dialog-content");
    var chaptersDialogClose = document.getElementById("chapters-dialog-close");
    var chaptersTopButton = document.getElementById("chapters-menu-button");
    var chaptersToolbarButton = document.getElementById("chapters-toolbar-button");
    var printChapterButton = document.getElementById("print-chapter-button");
    var printBookButton = document.getElementById("print-book-button");

    setupPopover(fontButton, fontMenu);
    setupPopover(printButton, printMenu);

    if (fontMenu) {
      fontMenu.addEventListener("click", function (event) {
        var option = event.target.closest("[data-font]");

        if (!option) {
          return;
        }

        setReaderFont(option.getAttribute("data-font"), true);
        closeAllPopovers();

        if (fontButton) {
          fontButton.focus({ preventScroll: true });
        }
      });
    }

    if (fontDecrease) {
      fontDecrease.addEventListener("click", function () {
        setReaderSize(prefs.sizeIndex - 1, true);
      });
    }

    if (fontIncrease) {
      fontIncrease.addEventListener("click", function () {
        setReaderSize(prefs.sizeIndex + 1, true);
      });
    }

    if (lineFocusToggle) {
      lineFocusToggle.addEventListener("click", function () {
        setLineFocus(!prefs.lineFocus, true, true);
      });
    }

    if (rateSelect) {
      rateSelect.addEventListener("change", function () {
        var selectedRate = Number(rateSelect.value);

        prefs.rate = audio ? audio.setRate(selectedRate) : nearestRate(selectedRate);
        savePrefs();

        if (audio && (audio.state === "playing" || audio.state === "paused")) {
          showToast("Speed saved — it will apply the next time you press Play.", 2800);
        }
      });
    }

    if (chaptersDialog) {
      installDialogDismissal(chaptersDialog);
    }

    function openChapters() {
      if (!chaptersDialog || !chaptersDialogContent || !currentBook) {
        return;
      }

      chaptersDialogContent.innerHTML = buildBookDialog(
        currentBook,
        currentChapter ? currentChapter.key : null,
        "chapters-dialog-title",
        "reader"
      );
      openDialog(chaptersDialog);
    }

    if (chaptersTopButton) {
      chaptersTopButton.addEventListener("click", openChapters);
    }

    if (chaptersToolbarButton) {
      chaptersToolbarButton.addEventListener("click", openChapters);
    }

    if (chaptersDialogClose) {
      chaptersDialogClose.addEventListener("click", function () {
        closeDialog(chaptersDialog);
      });
    }

    if (printChapterButton) {
      printChapterButton.addEventListener("click", function () {
        closeAllPopovers();
        printCurrentChapter();
      });
    }

    if (printBookButton) {
      printBookButton.addEventListener("click", function () {
        closeAllPopovers();
        printWholeBook();
      });
    }

    var primerStartButton = document.getElementById("primer-start-button");
    if (primerStartButton) {
      primerStartButton.addEventListener("click", function () {
        closePrimer();
      });
    }

    var comprehensionClose = document.getElementById("comprehension-dialog-close");
    if (comprehensionClose) {
      comprehensionClose.addEventListener("click", function () {
        closeDialog(document.getElementById("comprehension-dialog"));
      });
    }

    window.addEventListener("afterprint", cleanupPrintMode);
  }

  function setupPopover(button, menu) {
    if (!button || !menu) {
      return;
    }

    menu.setAttribute("role", "menu");
    menu.querySelectorAll("button").forEach(function (item) {
      if (!item.getAttribute("role")) {
        item.setAttribute("role", "menuitem");
      }
    });

    button.addEventListener("click", function (event) {
      event.stopPropagation();

      var willOpen = menu.hidden;
      closeAllPopovers();

      if (willOpen) {
        menu.hidden = false;
        button.setAttribute("aria-expanded", "true");
      }
    });

    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  function closeAllPopovers() {
    ["font-picker-button", "print-menu-button"].forEach(function (buttonId) {
      var button = document.getElementById(buttonId);
      var menuId = buttonId === "font-picker-button" ? "font-menu" : "print-menu";
      var menu = document.getElementById(menuId);

      if (menu) {
        menu.hidden = true;
      }

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function cleanupPrintMode() {
    document.body.removeAttribute("data-print-mode");
  }

  function printCurrentChapter() {
    if (!currentChapter) {
      return;
    }

    if (audio && (audio.state === "playing" || audio.state === "paused")) {
      audio.stop();
    }

    document.body.removeAttribute("data-print-mode");

    var header = document.getElementById("print-running-header");
    if (header) {
      header.textContent = printHeader(currentChapter);
    }

    window.setTimeout(function () {
      if (typeof window.print === "function") {
        window.print();
      } else {
        showToast("This browser does not support printing. Try your browser menu instead.", 4200);
      }
    }, 80);
  }

  function printWholeBook() {
    if (!currentBook) {
      return;
    }

    if (audio && (audio.state === "playing" || audio.state === "paused")) {
      audio.stop();
    }

    var printBook = document.getElementById("print-book");

    if (!printBook) {
      return;
    }

    printBook.innerHTML = currentBook.chapters.map(function (chapter) {
      return (
        '<section class="print-chapter">' +
          '<div class="print-chapter__header">' + escapeHtml(printHeader(chapter)) + '</div>' +
          '<p class="print-chapter__kicker">Chapter ' + chapter.number + '</p>' +
          '<h2>' + escapeHtml(chapter.title) + '</h2>' +
          (chapter.paragraphs || []).map(function (paragraph) {
            return '<p>' + escapeHtml(paragraph) + '</p>';
          }).join("") +
        '</section>'
      );
    }).join("");

    document.body.setAttribute("data-print-mode", "book");

    window.setTimeout(function () {
      if (typeof window.print === "function") {
        window.print();
      } else {
        cleanupPrintMode();
        showToast("This browser does not support printing. Try your browser menu instead.", 4200);
      }
    }, 80);
  }

  function rememberLastRead() {
    if (!currentBook || !currentChapter) {
      return;
    }

    progress.lastRead = {
      bookId: currentBook.id,
      chapterId: currentChapter.id,
      at: new Date().toISOString()
    };

    saveProgress();
  }

  /* ------------------------------------------------------------------------
     Reader — read-along audio
     ------------------------------------------------------------------------ */

  function initReadAlong() {
    var toolbar = document.getElementById("reading-toolbar");
    var toggle = document.getElementById("audio-toggle");
    var toggleIcon = document.getElementById("audio-toggle-icon");
    var toggleLabel = document.getElementById("audio-toggle-label");
    var stop = document.getElementById("audio-stop");
    var status = document.getElementById("audio-status");
    var rateSelect = document.getElementById("audio-rate");
    var voiceSelect = document.getElementById("audio-voice");

    if (!toolbar || !toggle || !toggleIcon || !toggleLabel || !status) {
      return;
    }

    if (
      !window.ReadlingsAudio ||
      !window.ReadlingsAudioTools ||
      !window.ReadlingsAudioTools.speechIsSupported()
    ) {
      toggle.disabled = true;
      toggle.setAttribute("aria-label", "Read-along audio is not available in this browser");
      toggleLabel.textContent = "No audio";
      status.textContent = "Read-along isn't available here";
      status.title = "Speech synthesis is not available in this browser.";

      if (stop) {
        stop.disabled = true;
      }
      if (rateSelect) {
        rateSelect.disabled = true;
      }

      if (voiceSelect) {
        voiceSelect.disabled = true;
      }

      setReadingHint("You can read the story yourself, or ask a grown-up to read it aloud.");
      return;
    }

    audio = new window.ReadlingsAudio({
      rate: prefs.rate,
      pitch: 1.05,
      onStateChange: handleAudioState,
      onWord: handleSpokenWord,
      onFinish: handleAudioFinish,
      onError: handleAudioError,
      onVoicesChanged: handleVoicesChanged
    });

    audio.setContent(audioContent.text, audioContent.words, audioContent.chapterKey);

    toggle.addEventListener("click", function () {
      if (!audio) {
        return;
      }

      audio.toggle();
    });

    if (stop) {
      stop.addEventListener("click", function () {
        if (!audio) {
          return;
        }

        audio.stop();
        clearActiveWord();
      });
    }

    if (status) {
      status.title = audio.voice
        ? "Read-along voice: " + audio.voice.name
        : "Read-along uses your device's English voice.";
    }

    if (rateSelect) {
      rateSelect.value = String(prefs.rate);
    }

    if (voiceSelect) {
      populateVoiceSelect();

      voiceSelect.addEventListener("change", function () {
        if (!audio) {
          return;
        }

        var selectedName = voiceSelect.value;
        var selectedVoice = selectedName ? audio.findVoice(selectedName) : null;

        prefs.voiceName = selectedName || "";
        savePrefs();

        audio.setVoice(selectedVoice);

        /* A new voice has to ride a fresh utterance, so restart the reading. */
        if (audio.state === "playing" || audio.state === "paused") {
          audio.stop();
          audio.play();
        }
      });
    }

    handleAudioState({
      state: "idle",
      supported: true,
      voice: audio.voice,
      detail: null
    });
  }

  function handleAudioState(info) {
    var state = info.state;
    var toolbar = document.getElementById("reading-toolbar");
    var toggle = document.getElementById("audio-toggle");
    var toggleIcon = document.getElementById("audio-toggle-icon");
    var toggleLabel = document.getElementById("audio-toggle-label");
    var stop = document.getElementById("audio-stop");
    var status = document.getElementById("audio-status");
    var label = "Play";
    var iconName = "play";
    var statusText = voiceStatus();

    currentAudioState = state;

    if (toolbar) {
      toolbar.classList.toggle("is-playing", state === "playing");
      toolbar.setAttribute("data-audio-state", state);
    }

    if (state === "playing") {
      label = "Pause";
      iconName = "pause";
      statusText = "Reading aloud — follow the underlined word";
      setReadingHint("Follow the <strong>underlined word</strong> as the story is read.");
    } else if (state === "paused") {
      label = "Resume";
      iconName = "play";
      statusText = "Paused — take your time";
      setReadingHint("Paused. Tap <strong>Resume</strong> whenever you are ready.");
    } else if (state === "ended") {
      label = "Play again";
      iconName = "play";
      statusText = "All done! Lovely reading";
      setReadingHint(
        isComplete(currentChapter)
          ? "All done! Another lovely reread."
          : "All done! Tap the star below when you are ready."
      );
    } else if (state === "error") {
      label = "Try again";
      iconName = "play";
      statusText = "The voice needs another try";
      setReadingHint("You can still enjoy reading the story yourself.");
    } else {
      statusText = voiceStatus();
      setReadingHint("Tap <strong>Play</strong> to follow the underlined word.");
    }

    if (toggleIcon) {
      toggleIcon.setAttribute("href", "#icon-" + iconName);
    }

    if (toggleLabel) {
      toggleLabel.textContent = label;
    }

    if (toggle) {
      toggle.setAttribute("aria-label", label + " the read-along");
    }

    if (stop) {
      stop.disabled = state !== "playing" && state !== "paused";
    }

    if (status) {
      status.textContent = statusText;
      status.title = audio && audio.voice
        ? "Read-along voice: " + audio.voice.name
        : "Read-along uses your device's English voice.";
    }

    if (state === "idle" || state === "ended" || state === "error") {
      clearActiveWord();
    }
  }

  function handleVoicesChanged(info) {
    var status = document.getElementById("audio-status");

    if (!status) {
      return;
    }

    if (typeof populateVoiceSelect === "function") {
      populateVoiceSelect();
    }

    if (currentAudioState === "idle" || currentAudioState === "error") {
      status.textContent = voiceStatus();
    }

    status.title = info.voice
      ? "Read-along voice: " + info.voice.name
      : "Read-along uses your device's English voice.";
  }

  function voiceStatus() {
    if (!audio || !audio.voice) {
      return "Tap Play to hear the story";
    }

    var name = audio.getVoiceLabel();

    if (!name || name === "your device’s voice") {
      return "Tap Play to hear the story";
    }

    return "Voice · " + name;
  }

  function handleSpokenWord(record) {
    if (activeWordEl) {
      activeWordEl.classList.remove("speaking-highlight");
      activeWordEl = null;
    }

    if (!record || !record.element) {
      return;
    }

    activeWordEl = record.element;
    activeWordEl.classList.add("speaking-highlight");
    keepWordInView(activeWordEl);

    if (document.body.classList.contains("line-focus-on")) {
      window.setTimeout(function () {
        updateFocusBand(activeWordEl);
      }, 90);
    }
  }

  function clearActiveWord() {
    if (activeWordEl) {
      activeWordEl.classList.remove("speaking-highlight");
      activeWordEl = null;
    }

    if (document.body.classList.contains("line-focus-on")) {
      updateFocusBandToCenter();
    }
  }

  function keepWordInView(element) {
    var rect = element.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var toolbar = document.getElementById("reading-toolbar");
    var toolbarRect = toolbar ? toolbar.getBoundingClientRect() : null;
    var topLimit = toolbarRect && toolbarRect.bottom > 0 ? toolbarRect.bottom + 26 : 90;
    var focusOn = document.body.classList.contains("line-focus-on");
    var outsideBand = focusOn
      ? rect.top < viewportHeight * 0.34 || rect.bottom > viewportHeight * 0.66
      : rect.top < topLimit || rect.bottom > viewportHeight - 48;

    if (!outsideBand) {
      return;
    }

    var target = window.scrollY + rect.top - viewportHeight * 0.42;

    window.scrollTo({
      top: Math.max(0, target),
      behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
  }

  function handleAudioFinish() {
    if (!currentChapter) {
      return;
    }

    if (!isComplete(currentChapter)) {
      showToast("Story finished! Tap the star when you are ready.", 3600);
    }
  }

  function handleAudioError(info) {
    showToast(info.message || "The read-along could not start. You can still read the story.", 4200);
  }

  function setReadingHint(html) {
    var hint = document.getElementById("reading-hint");

    if (hint) {
      hint.innerHTML = html;
    }
  }

  /* -----------------------------------------------------------------------
     Pre-reading primer
     ----------------------------------------------------------------------- */
  function extractSightWords(chapter) {
    var text = ((chapter && chapter.paragraphs) || []).join(" ").toLowerCase();
    var found = [];
    var seen = Object.create(null);

    SIGHT_WORDS.forEach(function (word) {
      var pattern = new RegExp("\\b" + word.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&") + "\\b", "i");
      if (pattern.test(text) && !seen[word]) {
        seen[word] = true;
        found.push(word);
      }
    });

    /* Fall back to the first short words in the chapter so we always have 3. */
    if (found.length < 3) {
      var tokens = text.match(WORD_PATTERN) || [];
      tokens.forEach(function (token) {
        var lower = token.toLowerCase();
        if (found.length >= 3) {
          return;
        }
        if (lower.length <= 6 && SIGHT_WORDS.indexOf(lower) === -1 && !seen[lower]) {
          seen[lower] = true;
          found.push(lower);
        }
      });
    }

    while (found.length < 3) {
      var fallback = SIGHT_WORDS[found.length % SIGHT_WORDS.length];
      if (!seen[fallback]) {
        seen[fallback] = true;
        found.push(fallback);
      } else {
        break;
      }
    }

    return found.slice(0, 3);
  }

  function extractPhonicsRule(chapter, book) {
    var skills = (book && Array.isArray(book.skills)) ? book.skills : [];
    var level = chapter ? chapter.levelData : null;
    var focus = (level && Array.isArray(level.focus)) ? level.focus : [];
    var candidates = skills.concat(focus);

    for (var i = 0; i < candidates.length; i += 1) {
      var skill = String(candidates[i] || "").toLowerCase();
      if (!skill) {
        continue;
      }
      if (skill.indexOf("short") !== -1) {
        return "Short vowel sound: " + skill;
      }
      if (skill.indexOf("long") !== -1) {
        return "Long vowel sound: " + skill;
      }
      if (skill.indexOf("blend") !== -1) {
        return "Consonant blends: " + skill;
      }
      if (skill.indexOf("silent") !== -1) {
        return "Silent letters: " + skill;
      }
      if (skill.indexOf("compound") !== -1) {
        return "Compound words: " + skill;
      }
      if (skill.indexOf("cvc") !== -1) {
        return "CVC words: sound out consonant-vowel-consonant";
      }
    }

    return focus.length ? String(focus[0]) : "Sound out each word slowly";
  }

  function speakText(text) {
    if (!window.speechSynthesis || typeof window.SpeechSynthesisUtterance !== "function") {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      var utterance = new window.SpeechSynthesisUtterance(String(text || ""));
      utterance.rate = 0.75;
      utterance.pitch = 1.05;
      utterance.volume = 1;
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      /* Speech is a progressive enhancement; never block reading. */
    }
  }

  function showPrimer() {
    var dialog = document.getElementById("primer-dialog");
    var sightContainer = document.getElementById("primer-sight-words");
    var ruleContainer = document.getElementById("primer-phonics-rule");

    if (!dialog || !currentChapter) {
      return;
    }

    var sightWords = extractSightWords(currentChapter);
    var phonicsRule = extractPhonicsRule(currentChapter, currentBook);

    if (sightContainer) {
      sightContainer.innerHTML = sightWords.map(function (word) {
        return (
          '<button class="primer-chip" type="button" data-primer-speak="' + escapeHtml(word) + '">' +
            escapeHtml(word) +
            '<span class="primer-chip__audio" aria-hidden="true">' + icon("speaker") + '</span>' +
          '</button>'
        );
      }).join("");

      sightContainer.querySelectorAll("[data-primer-speak]").forEach(function (button) {
        button.addEventListener("click", function () {
          speakText(button.getAttribute("data-primer-speak"));
        });
      });
    }

    if (ruleContainer) {
      ruleContainer.innerHTML =
        '<button class="primer-rule__audio" type="button" data-primer-speak="' + escapeHtml(phonicsRule) + '" aria-label="Play phonics rule">' +
          icon("speaker") +
        '</button>' +
        '<span>' + escapeHtml(phonicsRule) + '</span>';

      var ruleAudio = ruleContainer.querySelector("[data-primer-speak]");
      if (ruleAudio) {
        ruleAudio.addEventListener("click", function () {
          speakText(ruleAudio.getAttribute("data-primer-speak"));
        });
      }
    }

    document.body.classList.add("primer-open");

    if (typeof openDialog === "function") {
      openDialog(dialog);
    } else if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }

    /* Prevent closing via backdrop or escape until Start Story is pressed. */
    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
    });

    var startButton = document.getElementById("primer-start-button");
    if (startButton) {
      startButton.focus({ preventScroll: true });
    }
  }

  function closePrimer() {
    var dialog = document.getElementById("primer-dialog");

    if (dialog) {
      if (typeof closeDialog === "function") {
        closeDialog(dialog);
      } else if (typeof dialog.close === "function" && dialog.open) {
        dialog.close();
      }
    }

    document.body.classList.remove("primer-open");
  }

  /* -----------------------------------------------------------------------
     Tap-to-decode
     ----------------------------------------------------------------------- */
  function isDecodableWord(word) {
    var clean = String(word || "").replace(/[^A-Za-z]/g, "");
    if (!clean || clean.length > 8) {
      return false;
    }
    /* Only attempt sounding-out for the early levels. */
    if (currentChapter && currentChapter.levelData && currentChapter.levelData.id > 2) {
      return false;
    }
    return /^[bcdfghjklmnpqrstvwxyz]*[aeiou][bcdfghjklmnpqrstvwxyz]*$/i.test(clean);
  }

  function splitPhonemes(word) {
    var clean = String(word || "").toLowerCase().replace(/[^a-z]/g, "");
    var digraphs = ["tch", "dge", "igh", "eigh", "ould", "ch", "sh", "th", "ph", "wh", "ng", "ck", "qu"];
    var chunks = [];
    var i = 0;

    while (i < clean.length) {
      var matched = false;
      for (var d = 0; d < digraphs.length; d += 1) {
        var dg = digraphs[d];
        if (clean.indexOf(dg, i) === i) {
          chunks.push(dg);
          i += dg.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        chunks.push(clean.charAt(i));
        i += 1;
      }
    }

    return chunks.length ? chunks : [clean];
  }

  function setupWordTapToDecode() {
    var body = document.getElementById("chapter-body");
    if (!body) {
      return;
    }

    body.addEventListener("click", function (event) {
      var wordEl = event.target.closest(".word");
      if (!wordEl || !body.contains(wordEl)) {
        return;
      }

      var original = wordEl.getAttribute("data-original-word");
      if (!original) {
        original = wordEl.textContent;
        wordEl.setAttribute("data-original-word", original);
      }

      var word = original;
      var decodable = isDecodableWord(word);

      if (decodable) {
        wordEl.classList.add("is-decoding");

        /* Focus on pronunciation: say the whole word clearly. */
        speakText(word);

        window.setTimeout(function () {
          wordEl.classList.remove("is-decoding");
        }, 900);
      } else {
        speakText(word);
        wordEl.classList.add("is-decoding");
        window.setTimeout(function () {
          wordEl.classList.remove("is-decoding");
        }, 900);
      }
    });
  }

  function setupPageFocus() {
    var body = document.getElementById("chapter-body");
    if (!body) {
      return;
    }

    body.addEventListener("click", function (event) {
      if (!document.body.classList.contains("line-focus-on")) {
        return;
      }

      var pageEl = event.target.closest(".story-page, .story-paragraph");
      if (!pageEl || !body.contains(pageEl)) {
        return;
      }

      focusedPageEl = pageEl;
      focusBandVariables(pageEl);

      pageEl.scrollIntoView({
        block: "center",
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      });
    });
  }

  /* -----------------------------------------------------------------------
     Comprehension check
     ----------------------------------------------------------------------- */
  function getComprehension(chapter) {
    if (chapter && chapter.comprehension) {
      return chapter.comprehension;
    }

    var book = chapter ? chapter.book : currentBook;
    var emoji = (book && book.emoji) ? book.emoji : "📖";
    var otherEmojis = books
      .map(function (item) { return item.emoji; })
      .filter(function (item, index, list) {
        return item && item !== emoji && list.indexOf(item) === index;
      })
      .slice(0, 2);

    while (otherEmojis.length < 2) {
      otherEmojis.push("🌟");
    }

    var answers = [
      { emoji: emoji, label: "This story", correct: true },
      { emoji: otherEmojis[0], label: "A different story", correct: false },
      { emoji: otherEmojis[1], label: "Another adventure", correct: false }
    ];

    /* Shuffle gently so the correct answer is not always first. */
    for (var i = answers.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = answers[i];
      answers[i] = answers[j];
      answers[j] = tmp;
    }

    return {
      question: (chapter && chapter.summary) ? chapter.summary + " Which picture fits best?" : "Which picture fits our story best?",
      answers: answers
    };
  }

  function showComprehension() {
    var dialog = document.getElementById("comprehension-dialog");
    var questionEl = document.getElementById("comprehension-question");
    var answersEl = document.getElementById("comprehension-answers");
    var feedbackEl = document.getElementById("comprehension-feedback");

    if (!dialog || !currentChapter) {
      return;
    }

    var comprehension = getComprehension(currentChapter);

    if (questionEl) {
      questionEl.textContent = comprehension.question;
    }

    if (feedbackEl) {
      feedbackEl.textContent = "";
    }

    if (answersEl) {
      answersEl.innerHTML = comprehension.answers.map(function (answer, index) {
        return (
          '<button class="comprehension-answer" type="button" data-answer-index="' + index + '" data-correct="' +
            (answer.correct ? "true" : "false") + '">' +
            '<span class="comprehension-answer__emoji" aria-hidden="true">' + escapeHtml(answer.emoji) + '</span>' +
            '<span>' + escapeHtml(answer.label) + '</span>' +
          '</button>'
        );
      }).join("");

      answersEl.querySelectorAll(".comprehension-answer").forEach(function (button) {
        button.addEventListener("click", function () {
          var correct = button.getAttribute("data-correct") === "true";

          answersEl.querySelectorAll(".comprehension-answer").forEach(function (item) {
            item.classList.remove("is-correct", "is-try-again");
          });

          if (correct) {
            button.classList.add("is-correct");
            if (feedbackEl) {
              feedbackEl.textContent = "Beautiful reading! You noticed the story so well.";
            }
            window.setTimeout(function () {
              closeDialog(dialog);
              markCurrentChapterComplete();
            }, 900);
          } else {
            button.classList.add("is-try-again");
            if (feedbackEl) {
              feedbackEl.textContent = "Let's look again together — you can try another picture.";
            }
          }
        });
      });
    }

    if (typeof openDialog === "function") {
      openDialog(dialog);
    } else if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  }

  /* ------------------------------------------------------------------------
     Reader — completing a chapter
     ------------------------------------------------------------------------ */

  function markCurrentChapterComplete() {
    if (!currentChapter || isComplete(currentChapter)) {
      return;
    }

    if (audio && (audio.state === "playing" || audio.state === "paused")) {
      audio.stop();
    }

    progress.completed[currentChapter.key] = new Date().toISOString();
    progress.lastRead = {
      bookId: currentBook.id,
      chapterId: currentChapter.id,
      at: new Date().toISOString()
    };

    saveProgress();
    updateGlobalCounts();
    renderHeroBadges();
    renderSidebar();
    renderCompletion();
    setReadingHint("Star collected! Read it again whenever you like.");
    celebrateChapter();
  }

  function celebrateChapter() {
    var layer = document.getElementById("celebration-layer");

    if (!layer || !currentChapter) {
      return;
    }

    var bookStats = getBookStats(currentBook);
    var total = chapters.length;
    var done = getCompletedCount();
    var title = "Star collected!";
    var message = "One more chapter finished. Your reading trail is glowing.";

    if (done === total && total > 0) {
      title = "Master reader!";
      message = "You finished every Readlings chapter. What a library you have explored!";
    } else if (bookStats.complete) {
      title = "Book complete!";
      message = "Every star in " + currentBook.title + " is yours. Time for a happy dance!";
    }

    var pieceMarkup = "";
    var colors = ["#FFB800", "#FF6B6B", "#06B6D4", "#10B981", "#8B5CF6"];

    if (!prefersReducedMotion()) {
      for (var i = 0; i < 34; i += 1) {
        var color = colors[i % colors.length];
        var round = Math.random() > 0.66 ? " is-round" : "";
        var x = (Math.random() * 100).toFixed(1);
        var size = (6 + Math.random() * 7).toFixed(1);
        var drift = (Math.random() * 190 - 95).toFixed(0);
        var delay = (Math.random() * 0.55).toFixed(2);
        var duration = (2.1 + Math.random() * 1.2).toFixed(2);
        var rotate = (Math.random() * 180 - 90).toFixed(0);

        pieceMarkup +=
          '<span class="confetti-piece' + round + '" style="--confetti-color: ' + color +
            "; --confetti-x: " + x + "%; --confetti-size: " + size + "px; --confetti-drift: " + drift +
            "px; --confetti-delay: " + delay + "s; --confetti-duration: " + duration +
            "s; --confetti-rotate: " + rotate + 'deg;"></span>';
      }
    }

    layer.innerHTML =
      '<div class="star-pop" role="presentation">' +
        '<span class="star-pop__icon" aria-hidden="true">' + icon("star") + '</span>' +
        '<strong>' + escapeHtml(title) + '</strong>' +
        '<span>' + escapeHtml(message) + '</span>' +
      '</div>' +
      pieceMarkup;

    layer.classList.add("is-active");
    window.clearTimeout(celebrationTimer);
    celebrationTimer = window.setTimeout(function () {
      layer.classList.remove("is-active");
      layer.innerHTML = "";
    }, 3700);

    showToast(
      done === total && total > 0
        ? "Every chapter complete! You are a Readlings master reader."
        : "Star collected! " + currentChapter.title + " is complete.",
      4200
    );
  }

  /* ------------------------------------------------------------------------
     Reader — completion button event
     ------------------------------------------------------------------------ */

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-open-comprehension]");

    if (button) {
      event.preventDefault();
      showComprehension();
    }
  });

  /* ------------------------------------------------------------------------
     Global dismissal: popovers & any dialog without native Esc handling
     ------------------------------------------------------------------------ */

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".popover")) {
      closeAllPopovers();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    closeAllPopovers();

    document.querySelectorAll("dialog[open]").forEach(function (dialog) {
      closeDialog(dialog);
    });
  });
})();
