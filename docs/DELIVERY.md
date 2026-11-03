# Delivery evidence

FORMA was created in November 2026 as an original fictional architecture portfolio. The public application was verified on 3 November 2026.

- Repository: https://github.com/khalilBenAli1/forma-astro
- Live demo: https://khalilbenali1.github.io/forma-astro/
- Feature PR: https://github.com/khalilBenAli1/forma-astro/pull/1 — normal merge preserving coherent milestones.
- Verified application merge: `00d0aed50d1d5373ad35be72f522d141f97b14fc`.
- Successful application CI and deployment: https://github.com/khalilBenAli1/forma-astro/actions/runs/41564563121

## What was actually checked

Clean `npm ci`, valid AJV dependency placement, `npm audit` with zero findings, lint, formatting, strict Astro/TypeScript analysis without warnings or hints, six unit tests, production build, and fourteen Playwright journeys passed locally. The same quality/build/browser checks passed in GitHub Actions before the feature PR was merged. Main repeated those checks before publishing Pages.

The complete fourteen-journey suite was then rerun against the **actual public demo**, passing in Chromium and WebKit. This covered URL filtering/back/reload/empty results, gallery arrows/Tab/Escape/focus restoration, mobile menu, form invalid/success/reset states, absence of contact submission requests, no-JavaScript navigation and disabled form submission, all nine direct HTML routes, loaded font faces, layout hierarchy, Axe scans and overflow checks at 320/390/768/1440.

Additional public checks confirmed the custom unknown route returns HTTP 404 and its project link works, the sitemap responds HTTP 200 with all four case-study URLs, the homepage canonical uses the correct repository subpath, and the social image responds HTTP 200. Images, scripts and self-hosted Archivo/IBM Plex Sans fonts load without broken requests.

## Actual visual evidence

- [Live desktop capture](screenshots/home-desktop.png)
- [Live mobile capture](screenshots/home-mobile.png)
- [Project collection](screenshots/projects-desktop.png)
- [Project route](screenshots/project-desktop.png)
- [Contact page](screenshots/contact-desktop.png)
- [Short actual interaction recording](screenshots/forma-walkthrough.webm), 1280×800 WebM, approximately 3.7 seconds and 902 KiB; Chromium verified playable with no media error.

The reference review scored 94/100 after the requested font update. This is an internal visual assessment; it is not a Lighthouse score or accessibility certification. The final screenshot pair comes from the public deployment. [Payload measurements](PERFORMANCE.md), [architecture](ARCHITECTURE.md) and [asset/font provenance](../ASSETS.md) are documented separately.

No external deployment blockers remain. Physical mobile hardware and screen-reader verification were not performed. Imagery is conceptual AI artwork, and the contact form intentionally previews locally without delivery or persistence.
