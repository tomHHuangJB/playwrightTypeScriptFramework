#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="${LOCAL_AUTOMATION_APP_DIR:-$ROOT_DIR/LocalAutomationApp}"

if [ ! -d "$APP_DIR" ]; then
  echo "LocalAutomationApp not found at: $APP_DIR"
  echo "Set LOCAL_AUTOMATION_APP_DIR or clone it into $ROOT_DIR/LocalAutomationApp"
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to run health checks."
  exit 1
fi

echo "Starting LocalAutomationApp from: $APP_DIR"

echo "Building and starting backend (CI-aligned)"
pushd "$APP_DIR/backend" >/dev/null
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
npm run build
node dist/index.js > "$ROOT_DIR/.local-automation-backend.log" 2>&1 &
BACKEND_PID=$!
popd >/dev/null

echo "Building and starting frontend (CI-aligned)"
pushd "$APP_DIR/frontend" >/dev/null
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
VITE_API_URL="http://localhost:3001" npm run build
npx serve -s dist -l 5173 > "$ROOT_DIR/.local-automation-frontend.log" 2>&1 &
FRONTEND_PID=$!
popd >/dev/null

echo "$BACKEND_PID $FRONTEND_PID" > "$ROOT_DIR/.local-automation-pids"

for i in {1..30}; do
  if curl -fsS http://localhost:3001/health >/dev/null && curl -fsS http://localhost:5173 >/dev/null; then
    echo "App is up: http://localhost:5173"
    echo "PIDs saved in $ROOT_DIR/.local-automation-pids"
    exit 0
  fi
  sleep 2
done

echo "App did not start in time. Check logs:"
echo "  $ROOT_DIR/.local-automation-backend.log"
echo "  $ROOT_DIR/.local-automation-frontend.log"
exit 1
