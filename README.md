# Threads Clone

A clone of the public profile page of [Threads](https://www.threads.com), built
with Qwik. Enter the username of a real account and the app shows its header
and latest threads without logging in.

## How it works

- Qwik City renders the profile on the server. `getUserId` reads the user id
  from the public profile page, and `fetchData` queries the Threads GraphQL
  endpoint for the profile and its latest five threads.
- The responses are validated with type guards before they are used, so an
  unknown user or a failed request shows "User not found" with a 404.
- Avatars, images and videos are re-uploaded to Cloudinary, which serves them
  resized to 600px at 70% quality.
- Bios and captions are escaped before mentions are turned into links.
- The app is deployed to Vercel Edge Functions.

The GraphQL document ids and the `lsd` token are the ones the Threads web app
uses. They are not a public API and can stop working without notice.

## Getting Started

Requirements: Node.js 26 (pinned with Volta) and pnpm 11. pnpm runs the
project scripts with the Node.js version declared in `devEngines`.

```bash
pnpm install
pnpm dev      # App on http://localhost:5173
pnpm preview  # Production build served locally
pnpm deploy   # Deploy to Vercel with the Vercel CLI
```

`THREADS_ORIGIN` and `CLOUDINARY_API_ORIGIN` override the API origins on the
server. The e2e tests use them to point the app to a local mock.

## Project structure

- `src/routes`: the login page, the profile page (`@[username]`) and the 404
- `src/components`: the header, threads, carousels and modals
- `src/lib/services`: the server functions that read Threads
- `src/lib/utils`: the Threads and Cloudinary clients, type guards and
  formatting helpers
- `adapters/vercel-edge`: the Vercel Edge build
- `tests/unit`: Vitest unit tests for the utils and services, with fetch
  stubbed
- `tests/e2e`: Playwright tests on desktop Chrome and Pixel 7, against the
  preview build and a mock of the Threads and Cloudinary APIs
  (`tests/e2e/mock/server.ts`)
- `tests/fixtures`: trimmed copies of real Threads responses; a contract test
  checks they still have every field the app reads

## Checks

```bash
pnpm fmt.check    # Prettier (pnpm fmt fixes the files)
pnpm build.types  # TypeScript
pnpm lint         # ESLint (eslint-config-love)
pnpm test         # Unit tests (Vitest)
pnpm build        # Production build
pnpm test:e2e     # E2E tests (Playwright)
pnpm test:all     # All of the above, as the CI runs them
```

The CI also fails on high or critical advisories in production dependencies.
