#!/usr/bin/env bash
# Builds Akan Reports on Vercel (Hugo static site).
set -euo pipefail

HUGO_VERSION="${HUGO_VERSION:-0.165.0}"
TZ="${TZ:-Africa/Accra}"
HUGO_CACHEDIR="${HUGO_CACHEDIR:-${PWD}/.vercel/cache/hugo}"

export TZ
export HUGO_CACHEDIR
export HUGO_ENVIRONMENT="${HUGO_ENVIRONMENT:-production}"

cleanup() {
  if [[ -n "${build_temp_dir:-}" && -d "${build_temp_dir}" ]]; then
    rm -rf "${build_temp_dir}"
  fi
}
trap cleanup EXIT INT TERM

build_temp_dir="$(mktemp -d)"
mkdir -p "${HOME}/.local/hugo" "${HUGO_CACHEDIR}"

echo "Installing Hugo ${HUGO_VERSION} (extended)..."
curl -sfL \
  --output-dir "${build_temp_dir}" \
  -O "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
tar -C "${HOME}/.local/hugo" -xf "${build_temp_dir}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
export PATH="${HOME}/.local/hugo:${PATH}"

echo "Hugo: $(hugo version)"

if [[ "$(git rev-parse --is-shallow-repository)" == "true" ]]; then
  echo "Fetching full Git history for .GitInfo / .Lastmod..."
  git fetch --unshallow
fi

echo "Building production site..."
hugo --gc --minify --environment production
