Build a PRODUCTION-GRADE cross-platform Markdown IDE desktop application.

====================================================
PRODUCT DIRECTION
====================================================

We are NO LONGER building:
- Typora-style inline rendering
- invisible markdown transformation
- live block compilation engine

That architecture became too complex and unstable.

Instead, we are building a:
- high-performance Markdown IDE
- VSCode-style markdown workspace
- split-pane markdown editor + live preview
- native-feeling desktop writing tool

====================================================
PRIMARY PRODUCT GOAL
====================================================

The application should feel like:

“VSCode + Notepad + Markdown Preview”

Core philosophy:
- ultra-fast typing
- stable architecture
- scalable file system
- smooth preview rendering
- professional writing workflow

====================================================
TARGET PLATFORMS
====================================================

Must work smoothly on:
- Windows
- macOS
- Linux (Ubuntu/AppImage/.deb)

====================================================
TECH STACK
====================================================

Desktop:
- Electron

Frontend:
- React
- TypeScript
- Vite

Editor:
- Monaco Editor OR CodeMirror 6

Markdown Rendering:
- react-markdown
- remark-gfm
- rehype-highlight

State:
- Zustand

Persistence:
- IndexedDB
OR
- filesystem persistence

====================================================
CORE LAYOUT
====================================================

Application layout:

----------------------------------------------------
LEFT SIDEBAR
----------------------------------------------------
- markdown file explorer
- collapsible workspace tree
- open markdown files
- folder navigation
- create/delete/rename markdown files

----------------------------------------------------
CENTER PANEL
----------------------------------------------------
Markdown editor

Requirements:
- ultra-fast typing
- smooth scrolling
- syntax highlighting
- line numbers optional
- markdown autocomplete optional
- keyboard-first UX

----------------------------------------------------
RIGHT PANEL
----------------------------------------------------
Live markdown preview

Requirements:
- fast rendering
- GitHub-style markdown
- syntax-highlighted code blocks
- tables
- task lists
- images
- links
- headings

Preview updates:
- debounced
- smooth
- non-blocking

====================================================
IMPORTANT ARCHITECTURE DECISION
====================================================

The editor and preview MUST be separated.

Editor:
- raw markdown source only

Preview:
- rendered markdown only

DO NOT:
- convert editor inline
- remount editor while typing
- build Typora-style editing lifecycle

This architecture must prioritize:
- performance
- stability
- maintainability

====================================================
PERFORMANCE REQUIREMENTS
====================================================

Typing must feel:
- instant
- native
- zero-latency

Requirements:
- no rerender storms
- no full app rerenders
- isolated editor updates
- debounced markdown rendering
- async preview rendering

Preview rendering must NEVER block typing.

====================================================
EDITOR REQUIREMENTS
====================================================

Use:
- Monaco Editor OR CodeMirror 6

Support:
- markdown syntax highlighting
- undo/redo
- find/search
- multi-cursor optional
- keyboard shortcuts
- autosave
- line wrapping
- minimap optional

====================================================
FILE EXPLORER REQUIREMENTS
====================================================

Implement VSCode-style markdown workspace sidebar.

Features:
- open folder
- recursive markdown file listing
- collapsible folder tree
- create markdown file
- rename file
- delete file
- open file tabs optional

Supported:
- .md
- .markdown
- .txt

====================================================
LIVE PREVIEW REQUIREMENTS
====================================================

Right-side preview panel updates in near real-time.

Requirements:
- debounced rendering
- smooth scrolling
- no flickering
- syntax highlighting
- GitHub markdown support

Use:
- react-markdown
- remark-gfm
- rehype-highlight

====================================================
SYNC SCROLLING
====================================================

Optional but preferred:
- editor scroll sync
- preview scroll sync

Keep lightweight and performant.

====================================================
PERSISTENCE
====================================================

Implement:
- autosave
- recent files
- workspace restore
- editor state restore

====================================================
NOTEPAD-LIKE UX
====================================================

The app should feel:
- compact
- lightweight
- native
- distraction-free

Use:
- system fonts
- clean spacing
- minimal chrome
- smooth resizing

Avoid:
- bloated UI
- giant toolbars
- heavy animations
- webpage aesthetics

====================================================
SLASH COMMANDS
====================================================

Optional:
floating slash-command palette for markdown snippets.

Example:
/
→ heading
→ code block
→ table
→ checklist

Must NOT affect typing performance.

====================================================
FUTURE EXPANSION READINESS
====================================================

Architecture should later support:
- graph view
- backlinks
- AI assistant
- workspace search
- tabs
- plugins
- wiki linking

BUT:
Do NOT implement those now.

====================================================
BUILD REQUIREMENTS
====================================================

Generate:
- production folder structure
- Electron setup
- React/Vite setup
- editor integration
- markdown preview engine
- file explorer
- filesystem APIs
- autosave
- performance optimizations
- Electron Builder packaging

Generate installers for:
- Windows (.exe)
- macOS (.dmg)
- Linux (.deb + AppImage)

====================================================
PERFORMANCE PRIORITY
====================================================

Priority order:

1. typing smoothness
2. editor responsiveness
3. preview smoothness
4. file explorer stability
5. rendering quality
6. advanced features

====================================================
IMPORTANT
====================================================

DO NOT overengineer inline markdown rendering.

DO NOT build Typora-style editable rendering.

DO NOT build block-remounting systems.

Build:
- stable editor
- fast preview
- scalable markdown workspace
- native-feeling markdown IDE

The final product should feel:
- professional
- lightweight
- reliable
- fast enough for daily writing and development.