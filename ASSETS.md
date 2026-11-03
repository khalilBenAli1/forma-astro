# Artwork and fonts

All four architecture images depict fictional design studies. They are not documentary photographs or evidence of completed commissions. No private client assets or real client names are used.

| Delivered asset                       | Provenance                                                                               | Usage                          |
| ------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| `public/images/courtyard-*.webp`      | User-approved generated `references/assets/interiors.png` from the portfolio prompt pack | The Courtyard House only       |
| `public/images/listening-room-*.webp` | Original built-in ImageGen generation, November 2026                                     | The Listening Room only        |
| `public/images/clay-atelier-*.webp`   | Original built-in ImageGen generation, November 2026                                     | Clay Atelier only              |
| `public/images/tidal-pavilion-*.webp` | Original built-in ImageGen generation, November 2026                                     | Tidal Pavilion only            |
| `public/social-preview.jpg`           | Courtyard artwork with an original code-generated FORMA wordmark and heading             | Link preview                   |
| `public/favicon.svg`, arrow graphics  | Original SVG code                                                                        | Identity and controls          |
| `docs/screenshots/*.png`              | Actual production app captures made with Playwright                                      | Verification and documentation |

The built-in ImageGen tool was used; no API key, paid third-party workflow, or hotlinked image is required. Selected output files were copied into this repository as optimized WebP derivatives at 640, 1000 and 1600 pixels wide. Detail gallery frames are explicitly described as crops of one image, never additional views of a completed project. Shared studio and project-index imagery links to its originating study.

Typography is self-hosted: Archivo for display and IBM Plex Sans for body/interface text. The Latin variable Archivo WOFF2 comes from `@fontsource-variable/archivo@5.3.0`; the IBM Plex Sans Latin regular WOFF2 comes from `@fontsource/ibm-plex-sans@5.3.0`. Both use SIL OFL 1.1, with full notices in [Archivo-OFL.txt](docs/licenses/Archivo-OFL.txt) and [IBM-Plex-Sans-OFL.txt](docs/licenses/IBM-Plex-Sans-OFL.txt). Upstream authors: [Omnibus-Type/Archivo](https://github.com/Omnibus-Type/Archivo) and [IBM/plex](https://github.com/IBM/plex). Only the required two WOFF2 files are bundled; there are no runtime font-service requests. The original code MIT license does not relicense fonts or dependencies.

## Generation prompts

**The Listening Room:** Photorealistic editorial architecture photograph, landscape 3:2, of an intimate contemporary listening room and café in a converted Milan workshop. Oxblood lacquer counter, dark walnut record shelving, brushed stainless steel stools, warm terrazzo, one tall industrial arched window, quiet soft daylight. Unoccupied, level verticals, natural material grain. No text, logos, people or watermarks. Original fictional design study.

**Clay Atelier:** Photorealistic editorial architecture photograph, landscape 3:2, of a Copenhagen ceramics atelier with white limewashed brick, pale timber beams, oak work table with ceramic vessels, sculptural open shelving, north-facing windows, raw stone floor and a courtyard threshold. Unoccupied, cool soft natural daylight, straight verticals, realistic irregular material textures. No text, logos, people or watermarks. Original fictional design study.

**Tidal Pavilion:** Photorealistic editorial architecture photograph, landscape 3:2, of a coastal reading pavilion among pale Portuguese Atlantic dunes. Board-formed pale concrete walls, large square opening framing the sea, cork-lined reading alcove, long oak bench and marram grass. Late afternoon diffused light, view from within the enclosure, level verticals. No text, logos, people or watermarks. Original fictional design study.
