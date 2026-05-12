# MarkPad

> A fast, cross-platform Markdown workspace built with Electron + React.

MarkPad combines a clean Notepad-style editing experience with a real-time Markdown preview engine.

It is designed to feel:

* lightweight
* keyboard-focused
* distraction-free
* native on Windows/macOS/Linux
* fast for long-form writing and technical notes

---

# Preview

## Core Workspace

* Left Pane → Markdown Editor
* Right Pane → Live Preview
* File Explorer Sidebar
* Native Desktop Menus
* Cross-platform Desktop App

---

# Features

## Markdown Editing

* Real-time Markdown preview
* Split editor + preview layout
* Full Markdown rendering
* Supports `.md` and `.txt`
* Fast typing experience
* Large document support

---

## Workspace System

* Default workspace directory
* Persistent workspace memory
* Recently used directories
* Sidebar file explorer
* Filters only Markdown/Text files
* Open/edit/save files instantly

---

## Native Desktop Experience

* Windows-style desktop UI
* Native Electron menus
* File → Open / Save / Save As
* Undo / Redo support
* Keyboard shortcuts
* Fullscreen preview mode
* Resizable panels

---

## Cross Platform

MarkPad supports:

| Platform         | Package     |
| ---------------- | ----------- |
| Windows          | `.exe`      |
| Windows Portable | `.exe`      |
| macOS            | `.dmg`      |
| Linux Ubuntu     | `.deb`      |
| Linux Portable   | `.AppImage` |

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS

## Desktop Runtime

* Electron
* Electron Builder

## Editor Engine

* CodeMirror 6
* Markdown Parser

---

# Installation

## Windows

Download:

* `MarkPad-Setup-1.0.1.exe` (Installer)
* or `MarkPad-Portable-1.0.1.exe` (Standalone Portable)

Run the installer or simply launch the portable version.

---

## macOS

Download:

* `MarkPad-1.0.1.dmg`

Open the DMG and drag MarkPad into Applications.

---

## Linux

### Ubuntu / Debian

Install:

```bash
sudo dpkg -i MarkPad-1.0.1.deb
```

### Portable Linux

```bash
chmod +x MarkPad-1.0.1.AppImage
./MarkPad-1.0.1.AppImage
```

---

# Development Setup

## Clone Repository

```bash
git clone https://github.com/ZenithArcX/markpad.git
cd markpad
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

## Generate Release Packages

```bash
npm run dist
```

Generated packages will appear in:

```text
release/1.0.1/
```

---

# Project Structure

```text
src/
├── components/
├── editor/
├── preview/
├── workspace/
├── hooks/
├── utils/
├── styles/
└── App.tsx

electron/
├── main.ts
├── preload.cjs
└── ipcHandlers.ts
```

---

# Release Notes

## v1.0.1

* **Portable Target**: Added standalone Windows Portable `.exe` target.
* **Release Cleanups**: Removed all debug logs and DevTools auto-open in production.
* **Production Parity**: Fixed asar-aware path resolution for `file://` loading.
* **Security**: Hardened Content Security Policy and preload isolation.

## v1.0.0

Initial public release.

---

# License

MIT License

---

# Author

Built by **ZenithArcX**.

---

# Final Vision

MarkPad is evolving toward:

> a lightweight Markdown workspace for developers, researchers, writers, and AI-assisted workflows.
