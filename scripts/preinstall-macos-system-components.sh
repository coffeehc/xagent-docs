#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_NAME="$(basename "$0")"
WITH_OPTIONAL=0
WITH_DEV=0
CHECK_ONLY=0
DRY_RUN=0

BREW_FORMULAE=()
BREW_CASKS=()
MISSING_LABELS=()
POST_INSTALL_COMMANDS=()
NON_INSTALLABLE_LABELS=()

usage() {
  cat <<'USAGE'
Usage:
  scripts/preinstall-macos-system-components.sh [options]

Options:
  --required  Install only xagent required runtime system components. Default.
  --all       Include optional components: Node.js, Pandoc/XeLaTeX, FFmpeg.
  --dev       Include source build tools: Go, Node.js, pnpm.
  --check     Check current system only; do not install.
  --dry-run   Print install commands without running them.
  -h, --help  Show this help.

Requires:
  macOS with Homebrew installed.
USAGE
}

log() {
  printf '[%s] %s\n' "$SCRIPT_NAME" "$*"
}

warn() {
  printf '[%s] WARN: %s\n' "$SCRIPT_NAME" "$*" >&2
}

die() {
  printf '[%s] ERROR: %s\n' "$SCRIPT_NAME" "$*" >&2
  exit 1
}

run() {
  if [ "$DRY_RUN" -eq 1 ]; then
    printf '+'
    printf ' %q' "$@"
    printf '\n'
    return 0
  fi
  "$@"
}

have() {
  command -v "$1" >/dev/null 2>&1
}

have_any() {
  local item
  for item in "$@"; do
    if [[ "$item" == /* ]]; then
      [ -x "$item" ] && return 0
    elif have "$item"; then
      return 0
    fi
  done
  return 1
}

contains_item() {
  local needle="$1"
  shift
  local item
  for item in "$@"; do
    [ "$item" = "$needle" ] && return 0
  done
  return 1
}

add_brew_formula() {
  local item
  for item in "$@"; do
    [ -n "$item" ] || continue
    if [ "${#BREW_FORMULAE[@]}" -eq 0 ] || ! contains_item "$item" "${BREW_FORMULAE[@]}"; then
      BREW_FORMULAE+=("$item")
    fi
  done
}

add_brew_cask() {
  local item
  for item in "$@"; do
    [ -n "$item" ] || continue
    if [ "${#BREW_CASKS[@]}" -eq 0 ] || ! contains_item "$item" "${BREW_CASKS[@]}"; then
      BREW_CASKS+=("$item")
    fi
  done
}

mark_missing() {
  local label="$1"
  [ -n "$label" ] || return 0
  if [ "${#MISSING_LABELS[@]}" -eq 0 ] || ! contains_item "$label" "${MISSING_LABELS[@]}"; then
    MISSING_LABELS+=("$label")
  fi
}

mark_non_installable() {
  local label="$1"
  [ -n "$label" ] || return 0
  if [ "${#NON_INSTALLABLE_LABELS[@]}" -eq 0 ] || ! contains_item "$label" "${NON_INSTALLABLE_LABELS[@]}"; then
    NON_INSTALLABLE_LABELS+=("$label")
  fi
}

add_post_install() {
  local command_text="$*"
  [ -n "$command_text" ] || return 0
  if [ "${#POST_INSTALL_COMMANDS[@]}" -eq 0 ] || ! contains_item "$command_text" "${POST_INSTALL_COMMANDS[@]}"; then
    POST_INSTALL_COMMANDS+=("$command_text")
  fi
}

detect_macos() {
  [ "$(uname -s)" = "Darwin" ] || die "this script is for macOS only"
  have brew || die "Homebrew is required. Install it first: https://brew.sh"
}

require_python_runtime() {
  if python3 -m venv --help >/dev/null 2>&1 || python -m venv --help >/dev/null 2>&1; then
    return 0
  fi
  mark_missing "Python venv runtime"
  add_brew_formula python
}

require_cli_isolation() {
  have sandbox-exec && return 0
  mark_missing "CLI isolation runtime"
  mark_non_installable "sandbox-exec"
}

require_file_detect() {
  have file && return 0
  mark_missing "file type detection"
  add_brew_formula libmagic
}

require_poppler() {
  if have pdfinfo && have pdftotext && have pdftoppm && have pdftocairo; then
    return 0
  fi
  mark_missing "PDF extract/render"
  add_brew_formula poppler
}

require_libreoffice() {
  have_any soffice /Applications/LibreOffice.app/Contents/MacOS/soffice && return 0
  mark_missing "LibreOffice"
  add_brew_cask libreoffice
}

require_weasyprint() {
  have weasyprint && return 0
  mark_missing "WeasyPrint"
  add_brew_formula weasyprint
}

require_qpdf() {
  have qpdf && return 0
  mark_missing "qpdf"
  add_brew_formula qpdf
}

require_ghostscript() {
  have gs && return 0
  mark_missing "Ghostscript"
  add_brew_formula ghostscript
}

require_libvips() {
  have vips && return 0
  mark_missing "libvips"
  add_brew_formula vips
}

require_ocrmypdf() {
  have ocrmypdf && return 0
  mark_missing "ocrmypdf"
  add_brew_formula ocrmypdf
}

require_tesseract() {
  have tesseract && return 0
  mark_missing "Tesseract OCR"
  add_brew_formula tesseract tesseract-lang
}

require_cjk_fonts() {
  if have fc-match && fc-match "Noto Sans CJK SC" 2>/dev/null | grep -qi "noto"; then
    return 0
  fi
  mark_missing "CJK fonts"
  add_brew_formula fontconfig
  add_brew_cask font-noto-sans-cjk
}

require_node_runtime() {
  have node && return 0
  mark_missing "Node.js"
  add_brew_formula node
}

require_pandoc_pdf() {
  if have pandoc && have xelatex; then
    return 0
  fi
  mark_missing "Pandoc/XeLaTeX"
  add_brew_formula pandoc
  add_brew_cask basictex
}

require_ffmpeg() {
  if have ffmpeg && have ffprobe; then
    return 0
  fi
  mark_missing "FFmpeg"
  add_brew_formula ffmpeg
}

require_go_dev() {
  have go && return 0
  mark_missing "Go toolchain"
  add_brew_formula go
}

require_pnpm_dev() {
  have pnpm && return 0
  mark_missing "pnpm"
  require_node_runtime
  add_post_install "corepack enable"
  add_post_install "corepack prepare pnpm@10.24.0 --activate"
}

collect_requirements() {
  require_python_runtime
  require_cli_isolation
  require_file_detect
  require_poppler
  require_libreoffice
  require_weasyprint
  require_qpdf
  require_ghostscript
  require_libvips
  require_ocrmypdf
  require_tesseract
  require_cjk_fonts

  if [ "$WITH_OPTIONAL" -eq 1 ]; then
    require_node_runtime
    require_pandoc_pdf
    require_ffmpeg
  fi

  if [ "$WITH_DEV" -eq 1 ]; then
    require_go_dev
    require_node_runtime
    require_pnpm_dev
  fi
}

install_brew_packages() {
  if [ "${#BREW_FORMULAE[@]}" -gt 0 ]; then
    log "Installing Homebrew formulae: ${BREW_FORMULAE[*]}"
    run brew install "${BREW_FORMULAE[@]}"
  fi
  if [ "${#BREW_CASKS[@]}" -gt 0 ]; then
    log "Installing Homebrew casks: ${BREW_CASKS[*]}"
    run brew install --cask "${BREW_CASKS[@]}"
  fi
}

run_post_install_commands() {
  [ "${#POST_INSTALL_COMMANDS[@]}" -gt 0 ] || return 0
  local command_text
  for command_text in "${POST_INSTALL_COMMANDS[@]}"; do
    if ! have corepack && [[ "$command_text" == corepack* ]]; then
      if have npm; then
        log "corepack not found; installing pnpm with npm"
        run npm install -g pnpm@10.24.0
        return 0
      fi
      warn "corepack and npm are unavailable; pnpm was not installed"
      return 0
    fi
    log "Running post-install: $command_text"
    if [ "$DRY_RUN" -eq 1 ]; then
      printf '+ %s\n' "$command_text"
    else
      bash -lc "$command_text"
    fi
  done
}

print_summary() {
  log "Detected macOS package_manager=brew"
  if [ "${#MISSING_LABELS[@]}" -eq 0 ]; then
    log "All selected xagent system components are already available."
    return 0
  fi

  log "Missing selected components:"
  local item
  for item in "${MISSING_LABELS[@]}"; do
    printf '  - %s\n' "$item"
  done
  [ "${#BREW_FORMULAE[@]}" -eq 0 ] || printf 'Homebrew formulae: %s\n' "${BREW_FORMULAE[*]}"
  [ "${#BREW_CASKS[@]}" -eq 0 ] || printf 'Homebrew casks: %s\n' "${BREW_CASKS[*]}"
  if [ "${#NON_INSTALLABLE_LABELS[@]}" -gt 0 ]; then
    warn "These missing macOS components cannot be installed by Homebrew: ${NON_INSTALLABLE_LABELS[*]}"
  fi
}

parse_args() {
  while [ "$#" -gt 0 ]; do
    case "$1" in
      --required) WITH_OPTIONAL=0 ;;
      --all) WITH_OPTIONAL=1 ;;
      --dev) WITH_DEV=1 ;;
      --check) CHECK_ONLY=1 ;;
      --dry-run) DRY_RUN=1 ;;
      -h|--help)
        usage
        exit 0
        ;;
      *) die "unknown option: $1" ;;
    esac
    shift
  done
}

main() {
  parse_args "$@"
  detect_macos
  collect_requirements
  print_summary

  if [ "$CHECK_ONLY" -eq 1 ]; then
    [ "${#MISSING_LABELS[@]}" -eq 0 ] || exit 1
    exit 0
  fi
  [ "${#MISSING_LABELS[@]}" -gt 0 ] || exit 0

  install_brew_packages
  run_post_install_commands
  log "Install step finished. Re-run with --check to verify the final system state."
}

main "$@"
