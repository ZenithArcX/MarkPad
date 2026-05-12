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
| Windows Portable | `.zip`      |
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

* `MarkPad-Setup.exe`
* or `MarkPad-Portable.zip`

Run installer and launch MarkPad.

---

## macOS

Download:

* `MarkPad.dmg`

Open the DMG and drag MarkPad into Applications.

---

## Linux

### Ubuntu / Debian

Install:

```bash
sudo dpkg -i MarkPad.deb
```

### Portable Linux

```bash
chmod +x MarkPad.AppImage
./MarkPad.AppImage
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
release/
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

main/
├── main.ts
├── preload.cjs
└── ipc/
```

---

# Goals

MarkPad is focused on:

* fast startup
* low friction writing
* native-feeling UX
* simple markdown workflows
* offline-first editing
* clean desktop software

---

# Planned Features

## Upcoming

* Tabs system
* Global search
* Folder-wide Markdown indexing
* Command palette
* Theme support
* Vim mode
* Export to PDF
* Plugin system
* AI-assisted writing tools
* Workspace sync

---

# Performance Philosophy

MarkPad intentionally avoids:

* unnecessary animations
* bloated UI systems
* browser-like complexity
* heavy background services

The goal is:

> instant writing and instant preview.

---

# Screenshots

## Editor + Preview

*Add screenshots here*

---

## Fullscreen Preview

*Add screenshots here*

---

## Workspace Explorer

*Add screenshots here*

---

# Contributing

Pull requests and improvements are welcome.

If you find bugs or performance issues:

1. Open an issue
2. Reproduce the bug clearly
3. Include logs/screenshots if possible

---

# Release Notes

## v1.0.0

Initial public release.

Features included:

* Markdown editor
* Live preview
* Workspace explorer
* File management
* Undo/Redo
* Cross-platform packaging
* Electron desktop runtime

---

# License

MIT License

---

# Author

Built by Akhil Sai.

---

# Final Vision

MarkPad is evolving toward:

> a lightweight Markdown workspace for developers, researchers, writers, and AI-assisted workflows.

The focus is simplicity, speed, and real desktop productivity.
