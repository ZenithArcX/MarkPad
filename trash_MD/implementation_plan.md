# Cross-Platform Markdown Editor Implementation Plan

This document outlines the technical plan for building a minimal, fast, offline-first Markdown editor inspired by Windows Notepad, Obsidian, and Typora. The application will be built using Electron, React, TypeScript, Vite, TailwindCSS, CodeMirror 6, and Electron Builder.

## User Review Required

> [!IMPORTANT]
> The default stack for this combination is usually bootstrapped via `electron-vite` (or `vite-plugin-electron`), which natively supports React, TypeScript, and Vite, while setting up Electron's secure IPC and context isolation correctly out-of-the-box. I will use `npm create vite-electron-builder` or a basic Vite + `vite-plugin-electron` setup as the foundational scaffolding in the current directory (`d:\AKHIL\MD_reader`). Please confirm if this is acceptable.

> [!NOTE]
> Since we are building a desktop app, I will place all project files directly within `d:\AKHIL\MD_reader`. 

## Open Questions

> [!CAUTION]
> 1. **Layout Choice**: You mentioned Option A (split view) and Option B (single editor with live styling). CodeMirror 6 supports building a live-styled Markdown editor (WYSIWYG-like, similar to Typora), but it's significantly more complex than a split pane. Do you want the *default* to be a split-pane (Option A), or a single live-rendered pane (Option B)? I plan to implement **Option A** by default with toggles for Editor Only / Split View / Preview Only. Let me know if you prefer Option B natively.
> 2. **TailwindCSS Configuration**: I will set up standard Tailwind without heavy pre-made UI components to keep it looking like native Windows Notepad.
> 3. **App Name**: I will use "MarkPad" (or similar) as a placeholder name. Let me know if you have a specific name in mind.

## Proposed Architecture

The project will be initialized inside `d:\AKHIL\MD_reader`.

### Electron Layer (Main Process & Preload)
- **Main Process (`/electron/main/index.ts`)**: Will handle window management, native system menus, and the file system API (reading/writing files, file dialogs using `dialog` and `fs.promises`). It will also handle `electron-store` for persistent settings.
- **Preload Script (`/electron/preload/index.ts`)**: Will expose a secure `window.api` via `contextBridge` to the renderer, adhering strictly to `contextIsolation: true` and `nodeIntegration: false`. IPC channels will be set up for `open-file`, `save-file`, `update-menu`, etc.

### Renderer Layer (React & Vite)
- **State Management**: Zustand for managing application state (current file path, raw markdown content, settings like theme/wrap, UI view mode).
- **Styling**: TailwindCSS configured to use native fonts (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`) with a very plain, minimal aesthetic.
- **Editor Engine**: `@uiw/react-codemirror` (wrapping CodeMirror 6) with `@codemirror/lang-markdown`, configured for syntax highlighting, keymaps, and theming.
- **Markdown Preview**: `react-markdown` paired with `remark-gfm` (tables, task lists) and `rehype-highlight` (code syntax highlighting).

### Directory Structure

```text
/
├── electron/
│   ├── main.ts           # Main process code (menus, IPC, window)
│   └── preload.ts        # Context bridge
├── src/
│   ├── components/       # React components (Editor, Preview, SplitView)
│   ├── hooks/            # Custom hooks (e.g. useFileState, useSettings)
│   ├── store/            # Zustand state or Context providers
│   ├── utils/            # Markdown parsing helpers, formatters
│   ├── App.tsx           # Main application entry
│   └── index.css         # Tailwind directives
├── package.json          # Dependencies & Builder config
├── electron-builder.json # Build configurations for Win/Mac/Linux
├── tailwind.config.js
└── vite.config.ts
```

## Proposed Changes

We will execute this in phases:

### 1. Scaffolding & Setup
- Initialize the Vite + React + TypeScript + Electron project.
- Install necessary dependencies (`tailwindcss`, `@uiw/react-codemirror`, `react-markdown`, `electron-store`, `lucide-react` for minimal icons, `zustand`).
- Configure `tailwind.config.js` and `vite.config.ts`.

### 2. Electron Integration & IPC
#### [NEW] `electron/ipcHandlers.ts`
- Implement file operations (`fs.readFile`, `fs.writeFile`).
- Implement native dialogs.
#### [NEW] `electron/menu.ts`
- Create custom native menus (File, Edit, View, Help) using `Menu.buildFromTemplate`.
#### [NEW] `electron/preload.ts`
- Expose typed IPC methods to the renderer.

### 3. Application State & Settings
#### [NEW] `src/store/useAppStore.ts`
- Handle current file path, unsaved changes status, and content.
- Sync user settings (theme, view mode) with `electron-store` via IPC.

### 4. UI Implementation
#### [NEW] `src/components/Editor.tsx`
- Implement CodeMirror 6 instance.
#### [NEW] `src/components/Preview.tsx`
- Implement `react-markdown` renderer.
#### [NEW] `src/components/SplitView.tsx`
- Manage Editor/Preview layouts based on user toggles.
#### [MODIFY] `src/App.tsx`
- Tie the UI together, listen to menu shortcuts (e.g., Save, Open).

### 5. Packaging & Build
#### [MODIFY] `package.json`
- Configure `electron-builder` options: `nsis` (Windows), `dmg` (macOS), `deb`/`AppImage` (Linux) build targets.

## Verification Plan

### Automated Tests
- Run `npm run dev` to verify the Vite/Electron dev server starts.
- Ensure TypeScript compilation passes.

### Manual Verification
- Test opening a file via native dialog and drag-and-drop.
- Test saving and "Save As".
- Verify native menus trigger corresponding React actions.
- Test toggling between Split View, Editor Only, and Preview Only.
- Run `npm run build` to verify Electron Builder outputs `.exe` for Windows successfully.
