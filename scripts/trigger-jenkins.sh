#!/usr/bin/env bash
set -euo pipefail

JENKINS_URL="${JENKINS_URL:-http://localhost:9081}"
JENKINS_JOB="${JENKINS_JOB:-playwright-typescript-framework}"
JENKINS_USER="${JENKINS_USER:-}"
JENKINS_API_TOKEN="${JENKINS_API_TOKEN:-}"
JENKINS_PARAMS="${JENKINS_PARAMS:-}"

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to trigger Jenkins."
  exit 1
fi

auth_args=()
if [ -n "$JENKINS_USER" ] && [ -n "$JENKINS_API_TOKEN" ]; then
  auth_args=(-u "${JENKINS_USER}:${JENKINS_API_TOKEN}")
fi

crumb_header=()
crumb_json="$(curl -fsS "${auth_args[@]}" "${JENKINS_URL}/crumbIssuer/api/json" 2>/dev/null || true)"
if [ -n "$crumb_json" ]; then
  if command -v python3 >/dev/null 2>&1; then
    crumb_field="$(python3 -c 'import json,sys;print(json.load(sys.stdin).get("crumbRequestField",""))' <<<"$crumb_json")"
    crumb_value="$(python3 -c 'import json,sys;print(json.load(sys.stdin).get("crumb",""))' <<<"$crumb_json")"
  else
    crumb_field="$(echo "$crumb_json" | sed -n 's/.*"crumbRequestField":"\([^"]*\)".*/\1/p')"
    crumb_value="$(echo "$crumb_json" | sed -n 's/.*"crumb":"\([^"]*\)".*/\1/p')"
  fi
  if [ -n "$crumb_field" ] && [ -n "$crumb_value" ]; then
    crumb_header=(-H "${crumb_field}: ${crumb_value}")
  fi
fi

build_path="/job/${JENKINS_JOB}/build"
payload=()
if [ -n "$JENKINS_PARAMS" ]; then
  build_path="/job/${JENKINS_JOB}/buildWithParameters"
  payload+=(--data "$JENKINS_PARAMS")
fi

echo "Triggering Jenkins job: ${JENKINS_URL}${build_path}"
curl -fsS "${auth_args[@]}" "${crumb_header[@]}" -X POST "${payload[@]}" \
  "${JENKINS_URL}${build_path}" >/dev/null
echo "Jenkins trigger request sent."
