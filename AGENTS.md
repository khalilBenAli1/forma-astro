# FORMA

Independent original fictional portfolio. Preserve its static-first Astro architecture and `/forma-astro/` deployment base. Do not imply any design study is a built client commission.

- Node 22.23.4; npm 10.9.8; `npm ci`.
- Development `npm run dev` (port 4184), production `npm run build` and `npm run preview`.
- Quality: `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run test:e2e`.
- Content lives in `src/content/projects`; every record is validated before build.
- No framework runtime for small interactions. Use semantic HTML and focused TypeScript.
- Commit coherent verified milestones using the workspace Lore protocol. Never commit `.tools`, build output, browser reports, or secrets.
