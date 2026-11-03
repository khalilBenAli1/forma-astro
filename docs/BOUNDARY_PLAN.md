# Focused boundary pass

The implemented flows are protected by six unit tests and twelve passing Chromium/WebKit journeys. Preserve the approved appearance, routes, labels, keyboard behavior and local-only contact handling.

- Extract the project gallery markup and temporary dialog state into one focused gallery feature.
- Extract the project collection and URL filter behavior into one collection feature.
- Extract the enquiry form/result and in-memory UI orchestration into one contact feature; retain the pure validator in `src/lib/contact.ts`.
- Keep the route pages responsible for composition and static content retrieval. Add no global store or persistence.
- Verify the same full checks and production screenshots. Document data flow and boundaries.
