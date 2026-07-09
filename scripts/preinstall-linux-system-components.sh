#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_NAME="$(basename "$0")"
WITH_OPTIONAL=0
WITH_DEV=0
CHECK_ONLY=0
DRY_RUN=0
NO_UPDATE=0

PKG_MANAGER=""
DISTRO_ID=""
PACKAGES=()
MISSING_LABELS=()
POST_INSTALL_COMMANDS=()

usage() {
  cat <<'USAGE'
Usage:
  scripts/preinstall-linux-system-components.sh [options]

Options:
  --required   Install only xagent required runtime system components. Default.
  --all        Include optional components: Node.js, Pandoc/XeLaTeX, FFmpeg.
  --dev        Include source build tools: Go, Node.js, pnpm.
  --check      Check current system only; do not install.
  --dry-run    Print install commands without running them.
  --no-update  Skip package index update where supported.
  -h, --help   Show this help.

Supported package managers:
  apt-get, dnf, yum, pacman, zypper, apk
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

contains_item() {
  local needle="$1"
  shift
  local item
  for item in "$@"; do
    [ "$item" = "$needle" ] && return 0
  done
  return 1
}

add_pkg() {
  local item
  for item in "$@"; do
    [ -n "$item" ] || continue
    if [ "${#PACKAGES[@]}" -eq 0 ] || ! contains_item "$item" "${PACKAGES[@]}"; then
      PACKAGES+=("$item")
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

add_post_install() {
  local command_text="$*"
  [ -n "$command_text" ] || return 0
  if [ "${#POST_INSTALL_COMMANDS[@]}" -eq 0 ] || ! contains_item "$command_text" "${POST_INSTALL_COMMANDS[@]}"; then
    POST_INSTALL_COMMANDS+=("$command_text")
  fi
}

detect_linux_package_manager() {
  [ "$(uname -s)" = "Linux" ] || die "this script is for Linux only"

  if [ -r /etc/os-release ]; then
    # shellcheck disable=SC1091
    . /etc/os-release
    DISTRO_ID="${ID:-unknown}"
  else
    DISTRO_ID="unknown"
  fi

  if have apt-get; then
    PKG_MANAGER="apt"
  elif have dnf; then
    PKG_MANAGER="dnf"
  elif have yum; then
    PKG_MANAGER="yum"
  elif have pacman; then
    PKG_MANAGER="pacman"
  elif have zypper; then
    PKG_MANAGER="zypper"
  elif have apk; then
    PKG_MANAGER="apk"
  else
    die "no supported Linux package manager found"
  fi
}

require_python_runtime() {
  if python3 -m venv --help >/dev/null 2>&1 || python -m venv --help >/dev/null 2>&1; then
    return 0
  fi
  mark_missing "Python venv runtime"
  case "$PKG_MANAGER" in
    apt) add_pkg python3 python3-venv ;;
    dnf|yum) add_pkg python3 python3-pip ;;
    pacman) add_pkg python python-pip python-virtualenv ;;
    zypper) add_pkg python3 python3-pip python3-virtualenv ;;
    apk) add_pkg python3 py3-pip py3-virtualenv ;;
  esac
}

require_cli_isolation() {
  have bwrap && return 0
  mark_missing "CLI isolation runtime"
  add_pkg bubblewrap
}

require_file_detect() {
  have file && return 0
  mark_missing "file type detection"
  add_pkg file
}

require_poppler() {
  if have pdfinfo && have pdftotext && have pdftoppm && have pdftocairo; then
    return 0
  fi
  mark_missing "PDF extract/render"
  case "$PKG_MANAGER" in
    apt|dnf|yum|apk) add_pkg poppler-utils ;;
    pacman) add_pkg poppler ;;
    zypper) add_pkg poppler-tools ;;
  esac
}

require_libreoffice() {
  have soffice && return 0
  mark_missing "LibreOffice"
  case "$PKG_MANAGER" in
    pacman) add_pkg libreoffice-fresh ;;
    *) add_pkg libreoffice ;;
  esac
}

require_weasyprint() {
  have weasyprint && return 0
  mark_missing "WeasyPrint"
  case "$PKG_MANAGER" in
    dnf|yum) add_pkg python3-weasyprint ;;
    zypper) add_pkg python3-WeasyPrint ;;
    apk) add_pkg py3-weasyprint ;;
    *) add_pkg weasyprint ;;
  esac
}

require_qpdf() {
  have qpdf && return 0
  mark_missing "qpdf"
  add_pkg qpdf
}

require_ghostscript() {
  have gs && return 0
  mark_missing "Ghostscript"
  add_pkg ghostscript
}

require_libvips() {
  have vips && return 0
  mark_missing "libvips"
  case "$PKG_MANAGER" in
    apt) add_pkg libvips-tools ;;
    dnf|yum|zypper|apk) add_pkg vips-tools ;;
    pacman) add_pkg libvips ;;
  esac
}

require_ocrmypdf() {
  have ocrmypdf && return 0
  mark_missing "ocrmypdf"
  add_pkg ocrmypdf
}

require_tesseract() {
  have tesseract && return 0
  mark_missing "Tesseract OCR"
  case "$PKG_MANAGER" in
    apt)
      add_pkg tesseract-ocr tesseract-ocr-eng tesseract-ocr-chi-sim tesseract-ocr-chi-tra
      ;;
    dnf|yum)
      add_pkg tesseract tesseract-langpack-eng tesseract-langpack-chi_sim tesseract-langpack-chi_tra
      ;;
    pacman)
      add_pkg tesseract tesseract-data-eng tesseract-data-chi_sim tesseract-data-chi_tra
      ;;
    zypper)
      add_pkg tesseract-ocr tesseract-ocr-traineddata-english tesseract-ocr-traineddata-chinese_simplified tesseract-ocr-traineddata-chinese_traditional
      ;;
    apk)
      add_pkg tesseract-ocr tesseract-ocr-data-eng tesseract-ocr-data-chi_sim tesseract-ocr-data-chi_tra
      ;;
  esac
}

require_cjk_fonts() {
  if have fc-match && fc-match "Noto Sans CJK SC" 2>/dev/null | grep -qi "noto"; then
    return 0
  fi
  mark_missing "CJK fonts"
  case "$PKG_MANAGER" in
    apt) add_pkg fontconfig fonts-noto fonts-noto-cjk fonts-noto-color-emoji ;;
    dnf|yum) add_pkg fontconfig google-noto-sans-fonts google-noto-sans-cjk-fonts google-noto-color-emoji-fonts ;;
    pacman) add_pkg fontconfig noto-fonts noto-fonts-cjk noto-fonts-emoji ;;
    zypper) add_pkg fontconfig noto-sans-fonts noto-sans-cjk-fonts noto-coloremoji-fonts ;;
    apk) add_pkg fontconfig font-noto font-noto-cjk font-noto-emoji ;;
  esac
}

require_node_runtime() {
  have node && return 0
  mark_missing "Node.js"
  add_pkg nodejs npm
}

require_pandoc_pdf() {
  if have pandoc && have xelatex; then
    return 0
  fi
  mark_missing "Pandoc/XeLaTeX"
  case "$PKG_MANAGER" in
    pacman) add_pkg pandoc texlive-binextra texlive-latexrecommended ;;
    *) add_pkg pandoc texlive-xetex ;;
  esac
}

require_ffmpeg() {
  if have ffmpeg && have ffprobe; then
    return 0
  fi
  mark_missing "FFmpeg"
  add_pkg ffmpeg
}

require_go_dev() {
  have go && return 0
  mark_missing "Go toolchain"
  case "$PKG_MANAGER" in
    apt) add_pkg golang-go ;;
    *) add_pkg go ;;
  esac
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

sudo_command() {
  if [ "${EUID:-$(id -u)}" -eq 0 ]; then
    return 0
  fi
  have sudo || die "sudo is required when not running as root"
  printf 'sudo'
}

install_packages() {
  [ "${#PACKAGES[@]}" -gt 0 ] || return 0
  local sudo_cmd
  sudo_cmd="$(sudo_command)"

  log "Installing packages with $PKG_MANAGER: ${PACKAGES[*]}"
  case "$PKG_MANAGER" in
    apt)
      [ "$NO_UPDATE" -eq 1 ] || run ${sudo_cmd:+"$sudo_cmd"} apt-get update
      run ${sudo_cmd:+"$sudo_cmd"} apt-get install -y "${PACKAGES[@]}"
      ;;
    dnf)
      run ${sudo_cmd:+"$sudo_cmd"} dnf install -y "${PACKAGES[@]}"
      ;;
    yum)
      warn "Some xagent packages may require EPEL or RPM Fusion on yum-based systems."
      run ${sudo_cmd:+"$sudo_cmd"} yum install -y "${PACKAGES[@]}"
      ;;
    pacman)
      run ${sudo_cmd:+"$sudo_cmd"} pacman -Sy --needed --noconfirm "${PACKAGES[@]}"
      ;;
    zypper)
      [ "$NO_UPDATE" -eq 1 ] || run ${sudo_cmd:+"$sudo_cmd"} zypper --non-interactive refresh
      run ${sudo_cmd:+"$sudo_cmd"} zypper --non-interactive install "${PACKAGES[@]}"
      ;;
    apk)
      run ${sudo_cmd:+"$sudo_cmd"} apk add --no-cache "${PACKAGES[@]}"
      ;;
  esac
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
  log "Detected linux distro=${DISTRO_ID:-unknown} package_manager=$PKG_MANAGER"
  if [ "${#MISSING_LABELS[@]}" -eq 0 ]; then
    log "All selected xagent system components are already available."
    return 0
  fi

  log "Missing selected components:"
  local item
  for item in "${MISSING_LABELS[@]}"; do
    printf '  - %s\n' "$item"
  done
  [ "${#PACKAGES[@]}" -eq 0 ] || printf 'System packages: %s\n' "${PACKAGES[*]}"
}

parse_args() {
  while [ "$#" -gt 0 ]; do
    case "$1" in
      --required) WITH_OPTIONAL=0 ;;
      --all) WITH_OPTIONAL=1 ;;
      --dev) WITH_DEV=1 ;;
      --check) CHECK_ONLY=1 ;;
      --dry-run) DRY_RUN=1 ;;
      --no-update) NO_UPDATE=1 ;;
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
  detect_linux_package_manager
  collect_requirements
  print_summary

  if [ "$CHECK_ONLY" -eq 1 ]; then
    [ "${#MISSING_LABELS[@]}" -eq 0 ] || exit 1
    exit 0
  fi
  [ "${#MISSING_LABELS[@]}" -gt 0 ] || exit 0

  install_packages
  run_post_install_commands
  log "Install step finished. Re-run with --check to verify the final system state."
}

main "$@"
