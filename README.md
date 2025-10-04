# NgStore

NgStore is an Angular-based storefront sample application. It was scaffolded with Angular CLI (project files indicate Angular 20.x series). The application is structured to demonstrate a small e-commerce style app with pages, components, shared services, models, route guards, and an example Firebase resource service for backend integration.

This README documents project layout, how to run the app locally, build and test it, where to configure environment / Firebase settings, and developer tips for extending the codebase.

## Table of contents

- Project snapshot
- Prerequisites
- Quick start (dev server)
- Available scripts
- Project structure (key files)
- Environment & Firebase notes
- Building for production
- Testing
- Development tips & code style
- Troubleshooting

## Project snapshot

- Framework: Angular (20.x series inferred from project scaffolding)
- Source: `src/` (application code lives under `src/app`)
- Public assets: `public/` (images, favicon, profile picture, etc.)
- Firebase config: repository contains `firebase.json` and a `firebase-resource-service.ts` in `src/app/services`, so Firebase is used or supported by the app.

## Prerequisites

- Node.js (LTS recommended). Use a reasonably recent Node version compatible with Angular 20+.
- npm (bundled with Node) or an alternative package manager like pnpm/yarn.
- Angular CLI (recommended globally) for easier commands: `npm i -g @angular/cli` (optional; you can use npm scripts instead).

## Quick start (development server)

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm start
# or with the Angular CLI directly:
ng serve
```

3. Open your browser to: http://localhost:4200/

The application will reload automatically as you change files.

## Available scripts

Use `npm run <script>` for the commands below. The repository includes an `npm` task mapping for `start` and `test` (visible in workspace tasks). Typical scripts in an Angular project are:

- `npm start` or `ng serve` — start a local dev server
- `npm run build` or `ng build` — compile production build into `dist/`
- `npm test` or `ng test` — run unit tests (Karma/Jasmine)
- `npm run e2e` or `ng e2e` — run end-to-end tests (if configured)

If you need exact script names, check `package.json` for scripts and adjust the commands accordingly.

## Project structure (key files)

Top-level

- `angular.json` — Angular workspace configuration
- `package.json` — project dependencies and scripts
- `firebase.json` — Firebase hosting / functions configuration (when using Firebase)

Source (`src`):

- `main.ts` — application bootstrap (entry point)
- `index.html` — app host HTML
- `styles.css` — global styles
- `app/` — core application folder (see below)

Inside `src/app/` (high-level overview):

- `app.ts`, `app.routes.ts`, `app.config.ts` — main app module/bootstrap config and routing setup
- `pages/` — page-level modules and routes such as `home`, `products`, `carts`, `users`, `auth`, `about`, `contact`, `not-found`
  - Each page typically contains the page component files and nested components under `components/` for lists, items, filters, etc.
- `services/` — shared services like `auth-service.ts`, `product-service.ts`, `cart-service.ts`, `user-service.ts`, `firebase-resource-service.ts`, and `toast-service.ts`
- `models/` — TypeScript models/interfaces for `products`, `users`, `carts`, and shared/common models
- `guards/` — route guards (for example `auth-guard.ts`)
- `interceptors/` — HTTP interceptors (for example `auth-interceptor.ts`)
- `layouts/` — shared layout components such as navigation (`nav/`) and toast notifications (`toast/`)
- `environments/` — environment configuration files (`environment.ts`, `environment.development.ts`) used by Angular build system

This layout makes it straightforward to find feature code, services, and tests. Unit tests are co-located next to implementation (`*.spec.ts`).

## Environment & Firebase notes

- The presence of `firebase.json` and `src/app/services/firebase-resource-service.ts` indicate optional Firebase integration. The app likely delegates data persistence/reads to the Firebase service when enabled.
- Environment-specific configuration should be placed/updated in `src/environments/environment.ts` (and `environment.development.ts`) — this file typically contains API endpoints, Firebase config, or feature flags. Update the `production` flag and `firebase` config values as needed before building for production or running Firebase deploys.
- To deploy to Firebase Hosting (if you want):

  1.  Install Firebase CLI: `npm i -g firebase-tools`

2.  Login and initialize: `firebase login` then `firebase init hosting` (choose the project and set `dist/<app-name>` as the public directory if asked)
3.  Build and deploy:

```powershell
ng build --configuration production
firebase deploy --only hosting
```

Note: only run these steps if your Firebase project is configured and `firebase.json` contains the correct hosting target.

## Building for production

Build the application and produce optimized assets in `dist/`:

```powershell
ng build --configuration production
```

You can then serve the `dist/` output using a static server for a production-like test:

```powershell
npm install -g http-server
http-server ./dist -p 8080
# open http://localhost:8080
```

## Testing

- Unit tests: `ng test` (Karma + Jasmine) — look for `*.spec.ts` files throughout the `app/` folder for test coverage.
- E2E tests: `ng e2e` — only available if an e2e runner is configured in the project.

Add tests next to the files you change (the project already contains many `*.spec.ts` files). Running tests will watch or run once depending on your configuration.

## Development tips & recommended workflow

- Use Angular CLI to generate new components, services and modules. Example:

```powershell
ng generate component pages/products/components/products-list-component --flat=false
ng generate service app/services/product --skip-tests=false
```

- Keep models in `src/app/models` and import them in services/components to keep typing consistent.
- Co-locate unit tests (`*.spec.ts`) with their implementation files.
- Use the `auth-interceptor.ts` to attach tokens to outgoing requests. The guard `auth-guard.ts` protects routes for authenticated users.
- For UI/UX, `layouts/nav` and `layouts/toast` implement navigation and toast notifications used across pages.

## Troubleshooting

- If the app won't start, delete `node_modules` and reinstall:

```powershell
rm -r node_modules; npm install
```

- If TypeScript/Angular version mismatches cause build errors, ensure your global Angular CLI matches a compatible version, or use the local CLI via `npx ng <command>`.
- If Firebase features are failing, confirm `src/environments/*` contains the correct Firebase keys and the Firebase SDK is installed and correctly initialized where used.

## Where to look next in the codebase

- Routing: `src/app/app.routes.ts` — see how routes are registered for pages like `products`, `home`, `carts`, `auth`.
- Feature pages: `src/app/pages/products/` and `src/app/pages/home/` — examples of page components and nested components.
- Services: `src/app/services/*` — data access, authentication, toast notifications. `firebase-resource-service.ts` is the bridge to Firebase.

## Contributing

- Create a feature branch for any change: `git checkout -b feature/my-change`
- Run tests and lint (if available) before committing:

```powershell
npm test
```

- Open a pull request once changes are ready for review.

## Final notes

This README provides a practical developer-oriented overview. If you want, I can:

- add exact `package.json` script references into this README (I can read `package.json` and update it),
- add a small CONTRIBUTING.md with commit/lint/test rules, or
- add a short developer quickstart that wires a local Firebase emulator to the project.

If you'd like any of the above, tell me which and I'll update the repo.
