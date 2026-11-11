# Readlings

**Step-by-step reading adventures for early learners.**

Readlings is a free, standalone reading curriculum website for young children. It pairs a five-level curriculum with gentle read-along audio, dyslexia-friendly typography, focus mode, star progress, and clean printable chapter pages. There is no build step, backend, account system, or tracking.

## What is included

- **Seven reading levels (0–6):** from first CVC words to short chapter books, plus dedicated sight-word and common-pattern levels. Each level has its own page listing all of its books.
- **One page per level:** every level card opens `level.html?level=N`, with a level overview, reading focus, progress, and its complete book shelf.
- **Forty illustrated storybooks / 124 chapters:** six books each at Levels 0, 1, and 5; three at Level 2; two each at Levels 3 and 4; and fifteen phonics pattern books at Level 6.
- **Read-along narration:** automatic natural English voice selection, optional manual voice picker (US English and other English voices, male or female), 0.5× default speed, adjustable 0.25×–1.0× speed, synchronized word highlighting (underlined as it is read), automatic scrolling, and Play / Pause / Resume / Stop controls. Every page and paragraph also has a **Listen** button beside **Focus** to hear just that part again.
- **Reader comfort tools:** Lexend, Comic Neue, and OpenDyslexic fonts; five text sizes; a toggleable line-focus mask.
- **Progress:** stars and last-read position are saved in `localStorage` on the device.
- **Print editions:** print the current chapter or the whole book. Printed pages use a white background, black 16pt text, 1.8 line-height, 0.75in margins, a running header, and a page break per chapter.
- **Accessible by default:** responsive layouts, keyboard support, visible focus styles, reduced-motion support, and a small 404 page.

## Run it locally

The site is plain HTML, CSS, and JavaScript. Open `index.html` directly, or serve the folder to make browser testing match GitHub Pages:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
# visit http://127.0.0.1:8000
```

## Deploy to GitHub Pages

1. Push the contents of this folder to a GitHub repository.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then save.

All asset paths are relative, so the site works at a project URL such as `https://username.github.io/readlings/` as well as at a custom domain. The included `404.html` is picked up automatically by GitHub Pages.

## Project structure

```text
.
├── index.html              # Homepage: reading trail, level picker, book catalog
├── level.html              # Single reading level: overview, book shelf, level pager
├── reader.html             # Chapter reader, toolbars, dialogs, print containers
├── 404.html                # Friendly not-found page
├── site.webmanifest        # App icons and install metadata
├── css/styles.css          # Design system, components, responsive + print rules
├── js/audio.js             # Web Speech API controller and voice selection
├── js/app.js               # Curriculum setup, catalog, reader behaviour, print
├── data/curriculum.js      # Levels, books, chapters, summaries, guidance
└── assets/                 # Logo mark and favicon set (SVG, PNG, ICO, touch icon)
```

## Customizing the curriculum

Edit `data/curriculum.js` to add or change levels, books, or chapters. Each chapter provides paragraph text (and an optional word count / summary) that is normalized at runtime. Completed chapters have stable keys in the form `bookId/chapterId`, so avoid renaming those IDs for existing content unless you are happy to reset matching progress.

Reader preferences use these storage keys:

- `readlings.progress.v1` — `{ completed, lastRead }`
- `readlings.prefs.v1` — `{ font, sizeIndex, rate, focusMode, voiceName }` (`voiceName` is the chosen read-along voice, empty for automatic.)

## Printing tips

- For a single chapter, open the chapter, choose **Print → This chapter**, and print from the browser dialog.
- For a whole book, choose **Print → The whole book**. Each chapter starts on a new page.
- Leave "Background graphics" off for the cleanest, most ink-friendly page; the print stylesheet already forces black text on white with a readable running header.
- The site uses a pinned Google Fonts link for Lexend / Comic Neue and a pinned jsDelivr URL for OpenDyslexic. If a child is offline, the system font fallbacks still keep the story readable.

## Credits

Story text and illustrations are original to this project. Typefaces: [Lexend](https://www.lexend.com/), [Comic Neue](https://comicneue.com/), and [OpenDyslexic](https://opendyslexic.org/) (loaded from CDNs). The speech experience uses the browser's built-in Web Speech API; available voices vary by operating system and browser.
