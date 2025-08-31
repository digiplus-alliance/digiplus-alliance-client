# DigiPlus Alliance — Client

This is the frontend for DigiPlus Alliance: a small marketing and landing site built with Next.js (App Router), TypeScript and Tailwind CSS.

I use this repo for the public-facing landing pages, shared UI components, and small marketing flows.

Quick start
-----------

Prereqs

- Node.js 18+ (I recommend Node 20)
- npm (you can also use yarn or pnpm)

Install deps:

```bash
npm install
```

Run locally:

```bash
npm run dev
# open http://localhost:3000
```

Build:

```bash
npm run build
```

Start (after build):

```bash
npm run start
```

Lint:

```bash
npm run lint
```

What’s in the repo
------------------

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS for layout and utilities
- `react-icons` and `lucide-react` for icons
- UI primitives (see `src/components/ui/`) and shared components in `src/components/`

Important paths

- `src/app/` — App Router pages and layouts
  - `src/app/layout.tsx` — root layout used across the app
  - `src/app/landing/` — landing-specific layout and pages
- `src/components/` — Navbar, Footer, and the `ui` primitives
- `src/app/landing/widgets/` — hero, cards, and other landing widgets
- `public/` — static images and assets

Notes & conventions
-------------------

- Use per-route `layout.tsx` files for layout composition — files inside `src/app/<route>/layout.tsx` apply to that route and its children.
- Use the `cn()` helper in `src/lib/utils` for conditional class names.
- UI primitives use `class-variance-authority` (CVA) for variant styling.

Common tasks
------------

- Add a landing widget: create a component in `src/app/landing/widgets/` and import it in the landing page.
- Add a public image: place it in `public/` and reference it as `/your-image.png` in `next/image`.
- Add a component: create it under `src/components/` and use `cn()` for classes.

Deployment
----------

I deploy this on Vercel (recommended). Other Node hosts work too — run `npm run build` then `npm run start`.

Troubleshooting
---------------

- Tailwind classes missing: ensure `tailwind.config.*` content includes `src/**/*`.
- Images not loading: check the file is in `public/` and that `next/image` uses the public path (e.g. `/image.png`).
- Build errors mentioning Node: upgrade Node to v18+ (Node 20 preferred).

Contributing
------------

Fork, branch from `main`, make your changes, and open a PR. Keep PRs focused and include screenshots for visual changes.

Next improvements (ideas)
------------------------

- Add Storybook for visual testing of components.
- Add Jest + React Testing Library and some basic unit tests.
- Add CI (GitHub Actions) to run lint and build on PRs.

