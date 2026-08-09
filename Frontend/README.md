VistaGrid — A Dynamic Pinterest-Style Image Gallery

A framework-free image discovery website that turns the Unsplash photo library into a fast, infinitely scrollable, searchable masonry gallery — built end-to-end on vanilla HTML, CSS, and JavaScript.

HTML5 CSS3 JavaScript (ES6+) Unsplash API
What VistaGrid Solves

Most quick "browse some nice photos" experiences are either locked behind a heavy framework, require an account, or don't let you search and just keep scrolling. VistaGrid strips that down to the essentials: open the page, and you're immediately looking at a live, auto-refreshing wall of photography pulled straight from Unsplash — no sign-up, no build step, no backend server to run.

It's built as a demonstration that a smooth, modern gallery UX — masonry layout, infinite scroll, instant search, light/dark theming, lightbox viewing, and one-tap download/share — doesn't require React, Vue, or a bundler. Just the DOM, fetch, and a well-structured IntersectionObserver.

Key Features

Discovery & browsing

Responsive masonry grid (4 columns → 3 → 1 depending on viewport) using CSS columns, so images of any aspect ratio tile cleanly with no gaps.
Infinite scroll — new images load automatically as the user nears the bottom of the page, powered by an IntersectionObserver watching a sentinel element.
Random image feed on load, with duplicate-ID filtering so the same photo doesn't reappear as you scroll.
