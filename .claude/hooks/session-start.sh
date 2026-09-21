#!/bin/bash
#
# SessionStart hook for Claude Code on the web.
#
# The cloud container ships Node 22 and no Yarn 4, cannot reach GitHub
# releases, and has no hosts entry for the dev hostname. This puts every one
# of those right so `make run` works the moment a session opens. It is
# idempotent, and does nothing on a developer's own machine.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
cd "$ROOT"

log() { printf '[session-start] %s\n' "$*"; }

# ---------------------------------------------------------------------------
# Node 24 - both repos require it; the container's default is 22.
# ---------------------------------------------------------------------------
export NVM_DIR="${NVM_DIR:-/opt/nvm}"
# shellcheck disable=SC1091
source "$NVM_DIR/nvm.sh"

if ! nvm ls 24 >/dev/null 2>&1; then
  log 'installing Node 24'
  # The first download occasionally fails partway; one retry has always worked.
  nvm install 24 || nvm install 24
fi

nvm use 24 >/dev/null
nvm alias default 24 >/dev/null
log "node $(node -v)"

# ---------------------------------------------------------------------------
# Yarn 4 - via corepack, which must fetch from the npm registry: its default
# host is not reachable through the egress proxy.
# ---------------------------------------------------------------------------
export COREPACK_NPM_REGISTRY="${COREPACK_NPM_REGISTRY:-https://registry.npmjs.org}"
corepack enable
log "yarn $(yarn --version)"

# ---------------------------------------------------------------------------
# Dependencies.
# ---------------------------------------------------------------------------
log 'yarn install'
yarn install

# ---------------------------------------------------------------------------
# mkcert - `vite-plugin-mkcert` downloads the binary from GitHub releases,
# which the proxy refuses. Building it from source through the Go module
# proxy takes about ten seconds and the plugin picks it up from its data dir.
# ---------------------------------------------------------------------------
MKCERT_DIR="$HOME/.vite-plugin-mkcert"

if [ ! -x "$MKCERT_DIR/mkcert" ]; then
  export PATH="$PATH:/usr/local/go/bin:$HOME/go/bin"

  if command -v go >/dev/null 2>&1; then
    log 'building mkcert from source'
    go install filippo.io/mkcert@latest
    mkdir -p "$MKCERT_DIR"
    cp "$HOME/go/bin/mkcert" "$MKCERT_DIR/mkcert"
    chmod +x "$MKCERT_DIR/mkcert"
  else
    log 'go is not available; mkcert was not built and `make run` will fail on HTTPS'
  fi
fi

# ---------------------------------------------------------------------------
# Dev hostname - the site is served at https://localhost.kicl.com:3001.
# ---------------------------------------------------------------------------
DEV_HOST='localhost.kicl.com'

if ! grep -q "$DEV_HOST" /etc/hosts 2>/dev/null; then
  if [ -w /etc/hosts ]; then
    log "adding $DEV_HOST to /etc/hosts"
    printf '127.0.0.1 %s\n' "$DEV_HOST" >> /etc/hosts
  else
    log "/etc/hosts is not writable; add '127.0.0.1 $DEV_HOST' by hand"
  fi
fi

# ---------------------------------------------------------------------------
# Local env - only the two non-secret values Vite needs to boot.
# ---------------------------------------------------------------------------
if [ ! -f .env ]; then
  log 'writing .env'
  printf 'NODE_ENV=development\nPORT=3001\n' > .env
fi

# ---------------------------------------------------------------------------
# Persist for the session's shells.
# ---------------------------------------------------------------------------
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  {
    printf 'export NVM_DIR=%q\n' "$NVM_DIR"
    printf 'export PATH=%q:$PATH\n' "$(dirname "$(command -v node)")"
    printf 'export COREPACK_NPM_REGISTRY=%q\n' "$COREPACK_NPM_REGISTRY"
    printf 'export PLAYWRIGHT_BROWSERS_PATH=%q\n' "${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}"
    printf 'export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1\n'
  } >> "$CLAUDE_ENV_FILE"
fi

log 'ready'
