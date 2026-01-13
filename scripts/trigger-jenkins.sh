#!/bin/sh
# Trigger local Jenkins job manually.
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
if [ -f "$ROOT_DIR/scripts/jenkins.env" ]; then
  # Optional secrets/config file (git-ignored).
  . "$ROOT_DIR/scripts/jenkins.env"
fi

# Defaults can be overridden via scripts/jenkins.env or env vars.
JENKINS_URL="${JENKINS_URL:-http://localhost:9083}"
JOB_NAME="${JENKINS_JOB:-playwright-typescript-framework}"
USER="${JENKINS_USER:-adminPlay}"
TOKEN="${JENKINS_API_TOKEN:-}"
PARAMS="${JENKINS_PARAMS:-}"

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to trigger Jenkins." >&2
  exit 1
fi

AUTH_ARGS=""
if [ -n "$USER" ] && [ -n "$TOKEN" ]; then
  # Use basic auth when user/token are provided.
  AUTH_ARGS="-u $USER:$TOKEN"
fi

# Fetch CSRF crumb (if Jenkins has CSRF protection enabled).
CRUMB_JSON=$(curl -sS $AUTH_ARGS "$JENKINS_URL/crumbIssuer/api/json" 2>/dev/null || true)
CRUMB=$(printf '%s' "$CRUMB_JSON" | sed -n 's/.*"crumb":"\([^"]*\)".*/\1/p')
CRUMB_FIELD=$(printf '%s' "$CRUMB_JSON" | sed -n 's/.*"crumbRequestField":"\([^"]*\)".*/\1/p')

# Default to a plain build; switch to buildWithParameters when params exist.
DATA="json={}"
BUILD_ENDPOINT="$JENKINS_URL/job/$JOB_NAME/build"
if [ -n "$PARAMS" ]; then
  BUILD_ENDPOINT="$JENKINS_URL/job/$JOB_NAME/buildWithParameters"
  DATA="$PARAMS"
fi

# Trigger the build and capture HTTP status for error reporting.
RESP="$(mktemp)"
if [ -n "$CRUMB" ] && [ -n "$CRUMB_FIELD" ]; then
  STATUS=$(curl -sS -o "$RESP" -w "%{http_code}" -X POST $AUTH_ARGS \
    -H "$CRUMB_FIELD: $CRUMB" -H "Content-Type: application/x-www-form-urlencoded" \
    --data "$DATA" "$BUILD_ENDPOINT" || true)
else
  STATUS=$(curl -sS -o "$RESP" -w "%{http_code}" -X POST $AUTH_ARGS \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data "$DATA" "$BUILD_ENDPOINT" || true)
fi

if [ "$STATUS" -ge 200 ] && [ "$STATUS" -lt 400 ]; then
  echo "Triggered Jenkins job: $JOB_NAME (HTTP $STATUS)"
  rm -f "$RESP"
  exit 0
fi

echo "Failed to trigger Jenkins job: $JOB_NAME (HTTP $STATUS)" >&2
if [ -s "$RESP" ]; then
  echo "Response body:" >&2
  cat "$RESP" >&2
fi
rm -f "$RESP"
exit 1
