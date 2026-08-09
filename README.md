# VistaGrid — A Dynamic Pinterest-Style Image Gallery

A framework-free image discovery website that turns the Unsplash photo library into a fast, infinitely scrollable, searchable masonry gallery — built end-to-end on vanilla HTML, CSS, and JavaScript.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Unsplash](https://img.shields.io/badge/Unsplash-000000?style=for-the-badge&logo=unsplash&logoColor=white)

## Table of Contents

- [What VistaGrid Solves](#what-vistagrid-solves)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Author](#author)

## What VistaGrid Solves

Most quick "browse some nice photos" experiences are either locked behind a heavy framework, require an account, or don't let you search and just keep scrolling. VistaGrid strips that down to the essentials: open the page, and you're immediately looking at a live, auto-refreshing wall of photography pulled straight from Unsplash — no sign-up, no build step, no backend server to run.

It's built as a demonstration that a smooth, modern gallery UX — masonry layout, infinite scroll, instant search, light/dark theming, lightbox viewing, and one-tap download/share — doesn't require React, Vue, or a bundler. Just the DOM, fetch, and a well-structured IntersectionObserver.

## Key Features

**Discovery & browsing**
- Responsive masonry grid (4 columns → 3 → 1 depending on viewport) using CSS columns, so images of any aspect ratio tile cleanly with no gaps.
- Infinite scroll — new images load automatically as the user nears the bottom of the page, powered by an IntersectionObserver watching a sentinel element.
- Random image feed on load, with duplicate-ID filtering so the same photo doesn't reappear as you scroll.

**Search**
- Keyword search against Unsplash's full photo library.
- Paginated search results that keep loading via the same infinite-scroll mechanism once a search is active.

**Viewing & sharing**
- Click-to-expand lightbox modal for full-resolution viewing, closable via the "×" button, a click outside the image, or re-clicking.
- One-click download button per image (fetches the full-resolution blob rather than just linking out).
- Native share button using the Web Share API, with a graceful fallback alert on unsupported browsers.

**Theming & resilience**
- Light/dark mode toggle with the preference persisted in localStorage and restored on reload.
- Dismissible rate-limit banner that appears automatically if Unsplash's API returns a 403, so the failure mode is visible instead of silent.

## How It Works

- **Image fetching.** A single `fetchImages(query, page, retryCount)` function handles three cases: initial random load, "load more" random images (with client-side dedup against a `Set` of already-seen photo IDs), and keyword search (both the first page and subsequent pages, appended to a running `searchResults` array). A retry loop guards against occasional empty response batches from the random endpoint.
- **Rendering.** `displayImages()` takes a batch of Unsplash photo objects and builds the DOM for each — the `<img>` (using `urls.small` for the grid thumbnail and `urls.regular` cached in a `data-full` attribute for the lightbox), plus a download button and a share button, each wired to that photo's `urls.full`.
- **Infinite scroll.** A single `IntersectionObserver` watches a `.load-more-trigger` div at the bottom of the gallery. When it enters the viewport (with a `200px` root margin so loading starts slightly before the user hits bottom), it calls `fetchImages()` again — either continuing the current search's pagination or fetching another batch of random photos.
- **State model.** A small set of module-level flags (`isFetching`, `isSearchMode`, `currentSearchPage`, `seenRandomIds`) is the single source of truth for what the observer should do next, so scroll-triggered loads and search-triggered loads never collide or double-fire.

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Markup | HTML5 | Semantic structure, single-page layout |
| Styling | CSS3 (custom properties, `columns`, media queries) | Masonry layout, light/dark theming, responsive breakpoints |
| Logic | Vanilla JavaScript (ES6+, `async/await`) | Fetching, rendering, state, event handling |
| Scroll detection | `IntersectionObserver` API | Infinite scroll without scroll-event polling |
| Sharing | Web Share API | Native share sheet on supported devices |
| Images | [Unsplash API](https://unsplash.com/developers) | Source of all photo data |
| Icons | [Font Awesome](https://fontawesome.com/) | UI icons (search, download, share, theme, alerts) |
| Typography | [Google Fonts — Dancing Script](https://fonts.google.com/specimen/Dancing+Script) | Logo wordmark |

## Project Structure

```
VistaGrid/
├── index.html         # Page markup: header, search bar, gallery, modal
├── styles.css          # Theming, masonry grid, buttons, modal, banner styles
├── script.js            # Fetching, rendering, search, infinite scroll, theme logic
├── config.js             # Unsplash API key (gitignored, not committed)
├── .gitignore
└── 1.jpg – 7.jpg          # Static placeholder images shown before dynamic content loads
```

## Author

**Diksha Sharma**
