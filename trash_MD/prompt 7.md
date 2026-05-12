```txt id="prodenginev1"
Build a PRODUCTION-GRADE cross-platform desktop Markdown editor engine.

This is NOT a prototype.
This is NOT a markdown preview app.
This is NOT a simple React editor.

This must be a REAL desktop-grade writing engine optimized for:
- ultra-smooth typing
- invisible markdown rendering
- editable rendered markdown
- continuous document flow
- production-level performance
- scalability
- reliability

====================================================
PRIMARY PRODUCT GOAL
====================================================

The editor should feel like:

“Windows Notepad with invisible real-time Markdown intelligence.”

User experience targets:
- typing smoothness of Windows Notepad
- editing continuity of Typora
- responsiveness of VSCode
- rendering invisibility of Obsidian Live Preview

The user should NEVER:
- feel rendering
- feel React rerenders
- feel block boundaries
- feel autosave
- feel markdown parsing

Typing must ALWAYS have highest priority.

====================================================
TECH STACK (MANDATORY)
====================================================

Desktop:
- Electron

Frontend:
- React
- TypeScript
- Vite

State:
- Zustand

Markdown:
- unified
- remark
- remark-gfm
- rehype-highlight
- rehype-stringify

Persistence:
- IndexedDB OR SQLite
- NOT localStorage

Performance:
- requestAnimationFrame
- requestIdleCallback
- memoization
- incremental updates

====================================================
CRITICAL ARCHITECTURE RULES
====================================================

1. Separate typing engine from rendering engine.
2. Never parse markdown on every keystroke.
3. Never rerender entire document while typing.
4. Never block typing with persistence or parsing.
5. Rendered markdown must ALWAYS remain editable.
6. The editor must behave like ONE continuous document.
7. React must NOT control every character update.

====================================================
CORE DOCUMENT MODEL
====================================================

Use a block-based incremental document architecture.

Each block:

{
  id,
  rawMarkdown,
  renderedHtml,
  editing,
  compiled,
  markdownType,
  revision,
  createdAt,
  updatedAt
}

IMPORTANT:
Rendered HTML must NEVER replace raw markdown.
Raw markdown must ALWAYS be preserved internally.

====================================================
EDITOR ENGINE REQUIREMENTS
====================================================

Implement:
- local typing buffers
- isolated block updates
- incremental markdown compilation
- deferred rendering
- async persistence
- stable editor identity

Typing flow:
Typing
→ local buffer update
→ debounce
→ lightweight validation
→ incremental compile
→ render changed block only

====================================================
PERFORMANCE REQUIREMENTS
====================================================

Typing MUST feel:
- instant
- native
- zero-latency

Avoid:
- React rerender storms
- full document rerenders
- synchronous parsing
- expensive DOM recalculation
- global state updates per keystroke

Use:
- React.memo
- isolated local state
- stable refs
- async rendering
- granular updates

====================================================
MARKDOWN COMPILATION ENGINE
====================================================

Implement incremental block-based compilation.

ONLY compile:
- changed block
- directly affected neighboring blocks

DO NOT compile entire document repeatedly.

Incomplete markdown must remain editable raw markdown.

Examples:
- unclosed **
- unclosed `
- incomplete tables
- unfinished code fences

Must NOT render prematurely.

====================================================
EDITABLE RENDERED MARKDOWN
====================================================

Rendered markdown must NEVER become frozen HTML.

When user clicks rendered content:
- instantly restore editable markdown
- preserve cursor
- preserve selection
- preserve focus
- avoid flicker

Implement:
- stable editing surface
- non-destructive rendering
- minimal DOM replacement

====================================================
ENTER-TRIGGER SYSTEM
====================================================

Pressing Enter:
- splits block at exact cursor position
- validates markdown
- compiles valid sections
- preserves incomplete sections
- creates new editable block
- maintains cursor continuity

Must feel native and seamless.

====================================================
PASTE ENGINE
====================================================

Pasted markdown must:
- parse automatically
- split intelligently into blocks
- compile valid markdown instantly
- preserve editability
- avoid UI freezing

Large pastes:
- process asynchronously
- chunk parsing
- maintain UI responsiveness

====================================================
UNDO / REDO ENGINE
====================================================

Implement production-grade undo/redo.

Requirements:
- operation-based history
- structural sharing
- cursor restoration
- block restoration
- low memory overhead

Support:
- typing
- formatting
- Enter splits
- block merges
- paste operations
- markdown compilation

====================================================
PERSISTENCE LAYER
====================================================

Implement production-grade persistence.

Requirements:
- IndexedDB OR SQLite
- autosave
- crash recovery
- async writes
- snapshot recovery
- hydration system

Must support:
- large documents
- instant recovery
- zero typing lag

====================================================
CONTINUOUS DOCUMENT UX
====================================================

The editor must behave like ONE continuous writing surface.

Implement:
- natural cursor movement across blocks
- backspace merge behavior
- delete merge behavior
- multi-block selection
- continuous drag selection
- uninterrupted arrow navigation

Must NOT feel like:
- isolated React cards
- mini editors
- webpage blocks

====================================================
SLASH COMMAND SYSTEM
====================================================

Typing "/" should open:
- floating command palette
- cursor-relative overlay
- searchable commands
- keyboard navigation

The menu must:
- NOT affect layout
- NOT rerender document
- NOT create placeholder blocks

====================================================
INLINE TOOLBAR
====================================================

Add lightweight formatting toolbar:
- Bold
- Italic
- Code
- Heading
- List
- Quote
- Table
- Checklist

When user selects text:
- apply markdown syntax
- preserve cursor
- instantly render if valid

====================================================
NOTEPAD-LIKE UX
====================================================

The UI should feel:
- compact
- native
- distraction-free
- ultra-fast

Use:
- system fonts
- tight spacing
- minimal UI
- clean white background
- compact menus

Avoid:
- bloated ribbons
- giant margins
- webpage aesthetics
- card layouts

====================================================
LARGE DOCUMENT PERFORMANCE
====================================================

Must scale to:
- thousands of blocks
- large markdown files
- long writing sessions

Implement:
- virtualization readiness
- incremental parsing
- render isolation
- memory optimization

====================================================
DEBUGGING + PROFILING
====================================================

Add:
- rerender counters
- typing latency profiling
- render instrumentation
- performance monitoring

Detect:
- unnecessary rerenders
- blocked main thread
- slow parsing
- expensive updates

====================================================
FINAL DELIVERABLES
====================================================

Generate COMPLETE PRODUCTION-LEVEL SOURCE CODE:

1. Full folder structure
2. Electron setup
3. React/Vite setup
4. Zustand architecture
5. Incremental editor engine
6. Block system
7. Markdown compiler
8. Persistence layer
9. Undo/redo engine
10. Slash menu system
11. Toolbar system
12. Styling system
13. Performance optimization
14. Build scripts
15. Packaging config
16. README
17. Architecture explanation

====================================================
IMPORTANT
====================================================

DO NOT generate:
- prototype code
- demo architecture
- simplistic textarea examples
- fake markdown preview systems

Generate:
- production-grade architecture
- scalable editor engine
- performance-focused implementation
- maintainable source code

Optimize for:
1. typing smoothness
2. editing continuity
3. rendering invisibility
4. reliability
5. scalability

NOT feature quantity.
```
