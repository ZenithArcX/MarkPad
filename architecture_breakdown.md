# MarkPad: Architecture Breakdown

This document provides a COMPLETE implementation-level architectural breakdown of the two-way editable Markdown document engine, satisfying all constraints for a real-time, zero-latency, Notepad-like writing experience.

---

## 1. CORE EDITOR ARCHITECTURE

### State Management & Separation
The editor completely separates the **typing engine** from the **rendering engine** to guarantee smooth input.
- **Global State (Zustand)**: Stores an array of `BlockData` objects (`{ id, rawMarkdown, editing, compiled }`). It handles document persistence, undo/redo, and block-level structural changes (splits/merges).
- **Local State (React `useState`)**: Each `Block.tsx` maintains a `localValue` buffer. When a user types, only this local string updates. 

### Lifecycle Flow
1. **Typing**: User types in a `<textarea>`. `onChange` fires, updating `localValue` instantly.
2. **Debounce / Sync**: A `setTimeout` (500ms) waits for the user to pause typing, then flushes `localValue` to the Zustand store.
3. **Compilation**: If the typing pause occurs, the `isMarkdownIncomplete` regex validates the syntax. If valid, `editing` is set to `false`, swapping the `<textarea>` for a `<ReactMarkdown>` component.

---

## 2. PERFORMANCE STRATEGY

Typing achieves **near-zero latency** by completely isolating React reconciliation.
- **What rerenders are avoided**: Typing does **not** update the global Zustand state. Therefore, the parent `BlockEditor` and the 500 other sibling blocks do *not* re-render on every keystroke. Only the single active `<textarea>` block updates locally.
- **Memoization**: `Block.tsx` is wrapped in `React.memo`. Even when the global array adds a new block, untouched blocks skip reconciliation because their `BlockData` object reference hasn't changed.
- **Background Sync**: Markdown compilation is deferred via `setTimeout`, ensuring the main UI thread is never blocked during rapid typing.

---

## 3. ENTER-TRIGGER MARKDOWN COMPILATION

Pressing `Enter` dynamically splits the active block to maintain document flow.
1. **Intercept**: The `onKeyDown` handler catches `Enter`.
2. **Split**: It reads the native DOM `textareaRef.current.selectionStart` to physically split the `localValue` string into `leftPart` and `rightPart`.
3. **Validate**: The `leftPart` is passed through `isMarkdownIncomplete()`. If it contains complete syntax (e.g., a closed `**bold**` or `# Heading`), it compiles instantly (`editing: false`). If incomplete (e.g., `**bold`), it stays raw.
4. **Flow**: A new block is injected below it with the `rightPart`, and focus is instantly moved to it.

---

## 4. EDITABLE RENDERED BLOCKS

Rendered markdown is never frozen HTML; it is a visual mask over the editable state.
1. **Click Intercept**: A transparent absolute `<div>` sits over the rendered `ReactMarkdown`.
2. **Revert**: `onClick` fires `setBlockEditing(id, true)`. React unmounts the markdown and remounts the `<textarea>`.
3. **Cursor Restoration**: The `onClick` handler calculates the Y-axis percentage of the click relative to the block's bounding box (`e.clientY - rect.top`). It approximates the character index based on string length and automatically sets `selectionStart` on the `<textarea>`, preventing the cursor from rudely jumping to the end of the text.

---

## 5. PASTE ENGINE

Pasting is intercepted to prevent giant monolithic blocks.
1. **Intercept**: `onPaste` captures `e.clipboardData.getData('text/plain')`.
2. **Parse**: `parseMarkdownToBlocks` runs synchronously, splitting the text by paragraph boundaries (`\n\n`), ignoring empty lines inside code fences (`\````).
3. **Inject**: The first parsed block merges into the current block at the cursor position. The remaining parsed blocks are mass-injected into Zustand via `insertBlocksAfter`.
4. **Auto-Compile**: All newly injected blocks default to `editing: false` and compile instantly, creating a seamless visual flow.

---

## 6. UNDO / REDO ENGINE

A highly optimized transactional history stack lives in Zustand.
- **Structural Sharing**: The stack saves arrays of `BlockData`. Because Zustand uses immutability, unchanged blocks share the exact same memory reference across history snapshots. Saving history does *not* double memory usage.
- **Debounced Snapshots**: History (`commitHistory()`) is not pushed per keystroke. It is pushed immediately *before* structural changes (Enter, Delete, Toolbar formatting) and after a 500ms typing pause.

---

## 7. DOCUMENT CACHE / PERSISTENCE

- **Mechanism**: Every Zustand state change triggers an asynchronous serialization to `localStorage`.
- **Crash Recovery**: When `App.tsx` mounts, `initCache()` runs before the UI renders. It checks `localStorage` and instantly hydrates the `blocks` array, guaranteeing zero text loss.
- **Scale**: `localStorage` comfortably holds ~5MB (thousands of pages of text).

---

## 8. SLASH COMMAND SYSTEM

- **Trigger**: Typing `/` at the start of a block (`/(^|\n)\/([a-zA-Z]*)$/`) toggles `isSlashMenuOpen`.
- **Architecture**: The `SlashMenu` is a React component with `absolute z-50` positioning. It floats relative to the active block's container, ensuring it never pushes the layout down or causes document reflows.
- **Keyboard Hook**: The parent `<textarea>` intercepts `ArrowUp`, `ArrowDown`, and `Enter`, mapping them to the dropdown's selected index.
- **Execution**: Selecting a command replaces the `/query` text with the markdown boilerplate and immediately refocuses the textarea.

---

## 9. LARGE DOCUMENT PERFORMANCE

Currently, the editor scales comfortably to thousands of words because typing is locally buffered (O(1) update).
- **Future Virtualization**: If the document exceeds 10,000 blocks, rendering all HTML nodes will cause DOM lag. At that scale, a library like `react-window` would be introduced to virtualize the `BlockEditor`, unmounting blocks outside the viewport.

---

## 10. FAILURE MODES + RISK ANALYSIS

1. **Cursor Synchronization Jumps**: Approximating cursor index from Y-coordinates is imprecise. Clicking the end of a long wrapped paragraph might drop the cursor a few words away.
2. **React Rerender Storms**: If local buffering fails (e.g., a rogue `useEffect` loops), the entire block array will remount, crashing performance.
3. **Incomplete Markdown Bleed**: Complex nested markdown (e.g., tables inside quotes) might confuse the custom `isMarkdownIncomplete` regex, causing premature rendering that breaks layout.

---

## 11. NOTEPAD-LIKE UX REQUIREMENTS

- **Compact Spacing**: Tailwind's `.prose` class margins (`1.25em`) are aggressively overridden to `0.2em` in `index.css`.
- **Invisible Transitions**: The `<textarea>` is stripped of borders, backgrounds, and monospaced fonts. It perfectly inherits the exact typography (font, line-height) of the rendered HTML, making the transition between editing and compiling completely invisible to the user.

---

## 12. FINAL IMPLEMENTATION PLAN

### Final Architecture
We use a **Locally-Buffered Array of React Blocks**. It provides the strict data isolation of Notion, combined with the continuous textual flow of Typora.

### Folder Structure
```
src/
├── components/
│   ├── BlockEditor.tsx  (Virtual document surface)
│   ├── Block.tsx        (Local typing buffer & transition logic)
│   ├── Toolbar.tsx      (Native formatting ribbon)
│   └── SlashMenu.tsx    (Absolute floating palette)
├── store/
│   └── useAppStore.ts   (Zustand structural sharing, history, persistence)
└── utils/
    └── markdownParser.ts (Incremental splitting & regex validation)
```

### Exact Implementation Priority
1. **Typing Smoothness (Local Buffers)**: Must be built first. If typing lags, the editor is useless.
2. **Editing Continuity (Enter/Backspace)**: Ensure text physically flows between blocks natively.
3. **Rendering Invisibility (CSS Sync)**: Ensure textareas look identical to compiled HTML.
4. **Performance Stability (Zustand Memoization)**: Ensure the global tree ignores keystrokes.
5. **Editor Reliability (Undo/Redo & Cache)**: Prevent data loss.
