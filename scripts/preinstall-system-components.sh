#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  cat <<'USAGE'
Usage:
  scripts/preinstall-system-components.sh [options]

This entry script detects the current OS and routes to:
  scripts/preinstall-linux-system-components.sh
  scripts/preinstall-macos-system-components.sh

Options:
  --required  Install only xagent required runtime system components. Default.
  --all       Include optional components: Node.js, Pandoc/XeLaTeX, FFmpeg.
  --dev       Include source build tools: Go, Node.js, pnpm.
  --check     Check current system only; do not install.
  --dry-run   Print install commands without running them.
  --no-update Skip package index update where supported by the Linux script.
  -h, --help  Show this help.
USAGE
  exit 0
fi

case "$(uname -s)" in
  Linux)
    exec bash "$SCRIPT_DIR/preinstall-linux-system-components.sh" "$@"
    ;;
  Darwin)
    exec bash "$SCRIPT_DIR/preinstall-macos-system-components.sh" "$@"
    ;;
  *)
    printf '[preinstall-system-components.sh] ERROR: unsupported OS: %s\n' "$(uname -s)" >&2
    exit 1
    ;;
esac
