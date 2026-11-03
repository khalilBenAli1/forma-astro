# Production payload measurements

Measured from the actual Astro production output in November 2026. Reproduce with `npm run build` and `node scripts/measure-build.mjs`. These are file and local gzip sizes, not Lighthouse scores or mobile network timings. Hosting compression and browser caching can change transfer size.

## JavaScript and CSS

The build generates nine HTML pages. No hydrated UI framework, client router or third-party runtime is included.

| Asset or route                                  | Uncompressed bytes | Local gzip bytes |
| ----------------------------------------------- | -----------------: | ---------------: |
| Shared menu Escape handler                      |                161 |              147 |
| Collection filter feature                       |                739 |              411 |
| Gallery feature                                 |              1,302 |              583 |
| Contact form and validator                      |              1,700 |              845 |
| All scripts across the whole site               |              3,902 |            1,986 |
| Homepage, studio or 404 script budget           |                161 |              147 |
| Project route scripts, including shared handler |              1,463 |              730 |
| Contact route scripts, including shared handler |              1,861 |              992 |
| Shared CSS                                      |             17,774 |            4,240 |

Scripts are separate route-specific modules. The home page does not load the gallery, filters or enquiry behavior. The form validator is plain TypeScript and ships without Zod; Zod validates collection content at build time.

## Images

Four images have three responsive WebP candidates each, totalling **1,423,930 bytes across all 12 files**. A visitor loads the candidate selected for a given viewport/device, not all candidates. The social preview adds 154,747 bytes for social crawlers and is not a normal page image request.

| Image           |    640px |    1000px |    1600px |
| --------------- | -------: | --------: | --------: |
| Courtyard House | 50,618 B | 113,842 B | 242,260 B |
| Listening Room  | 48,778 B | 107,546 B | 207,898 B |
| Clay Atelier    | 47,116 B | 104,062 B | 205,596 B |
| Tidal Pavilion  | 29,944 B |  80,872 B | 185,398 B |

The Courtyard cover is 1600×900; the other images are 1600×1067. Correct intrinsic dimensions reserve space. Grid images declare half-page desktop sizes, while covers declare full content width. The first major photograph is eager/high-priority; other photographs are lazy. Gallery crops reuse their study's image URL rather than downloading invented additional angles. The system font stack downloads **zero font bytes**.

The largest delivered photograph is about 237 KiB. This is a deliberate quality tradeoff for an image-led architecture portfolio. The app has been visually inspected at 390px and 1440px, and all routes pass overflow checks at 320/390/768/1440. No real-device performance score or screen-reader certification is claimed.
