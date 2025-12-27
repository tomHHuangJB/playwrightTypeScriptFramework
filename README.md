# Playwright TypeScript Framework

This repo runs Playwright tests against the LocalAutomationApp. CI builds and serves the app before tests.

## Local Setup

### 1) Clone LocalAutomationApp
Clone into this repo root so the path is:
`/Users/tomhuang/prog/playwrightTypeScriptFramework/LocalAutomationApp`

```bash
git clone git@github.com:tomHHuangJB/LocalAutomationApp.git LocalAutomationApp
```

If you keep it elsewhere, set:
```bash
export LOCAL_AUTOMATION_APP_DIR=/path/to/LocalAutomationApp
```

### 2) Install dependencies
```bash
npm ci
```
Note: after changing dependencies, run `npm install` once to update `package-lock.json`,
then `npm ci` will work again.

### 3) Run the app (same flow as CI)
```bash
chmod +x scripts/run-local-app.sh
npm run app:run
```

The `scripts/run-local-app.sh` script mirrors the GitHub Actions steps (build, serve, health checks).

This builds the backend and frontend, starts them, and waits for:
- http://localhost:3001/health
- http://localhost:5173

PIDs are saved in `.local-automation-pids`. Logs:
- `.local-automation-backend.log`
- `.local-automation-frontend.log`

To stop:
```bash
kill $(cat .local-automation-pids)
```

### 4) Run tests
```bash
npm test
```

## CI Setup (Deploy Key)

GitHub Actions checks out `LocalAutomationApp` using a deploy key.

### 1) Generate a deploy key locally
```bash
ssh-keygen -t ed25519 -C "playwright-ci-localautomationapp" -f ./local_automation_app_ci
```

This creates:
- `./local_automation_app_ci` (private key)
- `./local_automation_app_ci.pub` (public key)

### 2) Add public key to LocalAutomationApp
In `tomHHuangJB/LocalAutomationApp`:
- Settings → Deploy keys → Add deploy key
- Title: `playwright-typescript-framework-ci`
- Key: paste contents of `./local_automation_app_ci.pub`
- Leave "Allow write access" unchecked

### 3) Add private key to this repo
In `tomHHuangJB/playwrightTypeScriptFramework`:
- Settings → Secrets and variables → Actions → New repository secret
- Name: `LOCAL_AUTOMATION_APP_SSH_KEY`
- Value: paste contents of `./local_automation_app_ci`

### 4) Cleanup local key (optional)
```bash
rm -f ./local_automation_app_ci ./local_automation_app_ci.pub
```

## CI Workflow Details
- Workflow file: `.github/workflows/ci.yml`.
- Steps run in CI:
  - Checkout this repo and `LocalAutomationApp` (via `LOCAL_AUTOMATION_APP_SSH_KEY`).
  - Build backend + frontend, then start them.
  - Wait for `http://localhost:3001/health` and `http://localhost:5173`.
  - Run `npm test` with `BASE_URL=http://localhost:5173`.
- Playwright report is uploaded as a workflow artifact.

## Notes
- CI runs the app and tests with `BASE_URL=http://localhost:5173`.
- Tests can be skipped in CI by setting `SKIP_UI=true`.

## Mobile Testing Support
- Mobile projects are enabled in `playwright.config.ts` (e.g., `Pixel 7`, `iPhone 13`).
- The app exposes mobile nav locators: `mobile-menu-button` and `mobile-nav-<label>` (for example, `mobile-nav-forms`).
- The shared `Header` component handles both desktop and mobile navigation by:
  - Clicking `nav-forms` on desktop.
  - Opening the mobile menu and clicking `mobile-nav-forms` on mobile.

Run only mobile projects:
```bash
npx playwright test --project="Pixel 7" --project="iPhone 13"
```

## Daily Run (Local)
```bash
export LOCAL_AUTOMATION_APP_DIR=/Users/tomhuang/prog/LocalAutomationApp
chmod +x scripts/run-local-app.sh
npm run app:run
npm test
```
