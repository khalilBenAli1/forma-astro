# Architecture and design

FORMA is a static-first portfolio, created in November 2026. Four imagined spaces have their own original images, project narratives and material palettes. The white/charcoal composition, oversized type, full-width mobile photograph and restrained arrows follow the approved FORMA references.

## Data flow and boundaries

`src/content/projects/*.json` → `src/lib/schema.ts` → Astro content collection → build-time route composition → static HTML and responsive image links.

- `src/content.config.ts` loads JSON through Astro's content loader and validates it with the same Zod schema that unit tests exercise. Invalid category, overview, image alternative, gallery or related slug values fail the contract. Tests also resolve every related project ID and require distinct covers.
- `src/pages/` retrieves typed collection records at build time and composes layout, narrative and feature components. `getStaticPaths` produces one directory route per project; there is no client router or fallback dependency.
- `src/features/projects/ProjectCollection.astro` owns the URL category filter. The URL is the source of truth; visibility and the result count derive from that state. Browser Back and reload restore it. Without JavaScript, every project remains accessible.
- `src/features/projects/ProjectGallery.astro` owns gallery presentation and temporary local state: active image and opener element. The native dialog supplies modality and Escape; a small scoped keyboard handler gives consistent Tab cycling across browser engines and restores focus. Full-image anchors work without JavaScript. Detail frames are crops of the same concept image, labelled honestly.
- `src/features/contact/ContactForm.astro` owns form feedback and the local preview state. `src/lib/contact.ts` is a pure TypeScript validator with no DOM or storage dependency. Contact values exist only while submitting the form; successful preview resets the fields. Nothing is saved, transmitted or put into URL query strings. Without JavaScript the submit button stays disabled.
- `src/components/` contains shared rendering pieces: responsive photograph, project card and arrow. `src/layouts/Layout.astro` owns metadata, site navigation and footer. `src/lib/paths.ts` centralizes the GitHub Pages subpath.

There is no global store, localStorage adapter, account, backend, analytics, payment service or framework hydration runtime. Those would add responsibilities this portfolio does not have. Scripts ship only on the pages that need them, with a shared 161-byte menu Escape handler. Normal document navigation preserves a useful static site.

## Rendering and assets

Astro prerenders nine HTML pages. GitHub Pages serves them under `/forma-astro/`, including direct project routes. The deliberate `404.html` uses absolute subpath-aware links so it also works at an unknown nested URL. Canonical URLs, a generated sitemap, description and social preview metadata are provided.

Image dimensions reserve layout space; eager high-priority loading is limited to the first main image. Other images are lazy, WebP, and have 640/1000/1600-width candidates. The gallery intentionally loads its single original full image only once per study. Archivo display type and IBM Plex Sans interface type are self-hosted as two Latin WOFF2 assets, with display swap, preload hints and SIL OFL notices. They give this project an intentional font identity while preserving the approved architecture composition. Motion is limited to image and control transitions and respects reduced motion.

Node 22.23.4 satisfies Astro 7.4.5's current engine requirement. npm 10.9.8 is pinned and installed explicitly in CI. Project-local `legacy-peer-deps=false` makes peer resolution explicit and consistent across local and CI installs. TypeScript 6.0.3 is used with the current compatible lint tooling. AJV 8.20.0 is pinned as a development peer for the Astro language server, while ESLint retains its nested AJV 6 dependency; this prevents npm from incorrectly hoisting the incompatible peer version. The minimatch override to 11.0.1 fixes its glob-amplification advisory; full checks validate the lint toolchain with that override.

## Verification and limits

Tests cover the actual content schema and related routes, pure form validation, URL state/back/reload/empty results, all prerendered routes, gallery arrows/Tab/Escape/focus restoration, mobile menu, contact success/retry and absence of submission requests. Chromium and WebKit also check static no-JavaScript navigation, disabled no-JavaScript form submission, layout geometry, Axe scans and reflow at 320/390/768/1440.

Automated scans support the WCAG 2.2 AA target; they are not a certification. Physical screen-reader/mobile-hardware testing and a real enquiry backend are outside this demo. AI imagery may contain architectural imperfections and is presented only as conceptual artwork.

Playwright starts Astro preview with the documented `--ignore-lock` foreground option. This avoids Astro 7 auto-backgrounding the preview inside an agent session, and lets the test runner own server startup and cleanup.
