#!/usr/bin/env bash
# Verify every redirect in public/_redirects resolves 301 → 200 with no loops.
# Usage: BASE=https://learnersacademy.com.pk ./scripts/check-redirects.sh
#        (point BASE at the Cloudflare Pages *preview* URL before cutover)
set -euo pipefail

BASE="${BASE:-https://learnersacademy.com.pk}"
REDIRECTS="$(dirname "$0")/../public/_redirects"
fail=0

echo "Checking redirects against: $BASE"
while read -r src dst code _; do
  # skip comments, blanks, wildcards (curl can't assert a representative path)
  [[ "$src" =~ ^#|^$ ]] && continue
  [[ "$src" == *"*"* ]] && continue
  [[ "$code" != "301" ]] && continue

  status=$(curl -s -o /dev/null -w '%{http_code}' -I "$BASE$src" || echo "000")
  final=$(curl -s -L -o /dev/null -w '%{http_code}' "$BASE$src" || echo "000")
  if [[ "$status" == "301" && "$final" == "200" ]]; then
    printf '  ok   %-34s -> %s\n' "$src" "$dst"
  else
    printf '  FAIL %-34s (head=%s final=%s)\n' "$src" "$status" "$final"
    fail=1
  fi
done < "$REDIRECTS"

exit $fail
