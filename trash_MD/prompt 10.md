Build a PRODUCTION-GRADE cross-platform Markdown Workspace IDE desktop application.

====================================================
CORE PRODUCT IDEA
====================================================

The application is a:
- workspace-based Markdown IDE
- native desktop markdown editor
- file-system-first writing tool

The application should feel like:
- VSCode
- Notepad
- Obsidian (lightweight)
- Typora preview system

BUT:
- much simpler
- faster
- minimal
- distraction-free

====================================================
PRIMARY V1 REQUIREMENT
====================================================

The MOST IMPORTANT feature is:

WORKSPACE DIRECTORY SYSTEM

The app revolves around a selected directory/workspace.

====================================================
WORKSPACE DIRECTORY BEHAVIOR
====================================================

When user first opens the app:
- prompt user to choose a workspace directory
- save this workspace path persistently
- automatically reopen the same workspace next launch

User can later:
- switch workspace
- open another folder
- change workspace anytime

====================================================
WORKSPACE CONTENT REQUIREMENTS
====================================================

Inside the selected workspace directory:
- show ALL markdown files
- show ALL text files
- recursively display folders/files

Supported:
- .md
- .markdown
- .txt

====================================================
LEFT SIDEBAR (FILE EXPLORER)
====================================================

Implement VSCode-style file explorer.

Requirements:
- recursive folder tree
- collapsible folders
- markdown file listing
- text file listing
- create markdown file
- rename file
- delete file
- refresh workspace
- workspace switch button

The sidebar should:
- feel native
- lightweight
- smooth
- compact

====================================================
CENTER PANEL (EDITOR)
====================================================

Implement high-performance markdown editor.

Use:
- Monaco Editor OR CodeMirror 6

Requirements:
- ultra-fast typing
- syntax highlighting
- undo/redo
- autosave
- keyboard shortcuts
- smooth scrolling
- line wrapping
- search/find
- native-feeling editing

IMPORTANT:
Typing performance is highest priority.

====================================================
RIGHT PANEL (LIVE PREVIEW)
====================================================

Implement live markdown preview panel.

Requirements:
- GitHub-style markdown rendering
- syntax-highlighted code blocks
- tables
- task lists
- headings
- images
- links

Preview updates:
- debounced
- smooth
- asynchronous
- non-blocking

Typing must NEVER lag because of preview rendering.

====================================================
PREVIEW MAXIMIZE FEATURE
====================================================

Add preview maximize mode.

Requirements:
- maximize preview to fullscreen/editor-width mode
- hide editor/sidebar temporarily
- clean reading mode
- smooth transition
- escape button to restore layout

This is VERY IMPORTANT for:
- documentation reading
- markdown reviewing
- article preview

====================================================
LAYOUT SYSTEM
====================================================

Application layout:

----------------------------------------------------
LEFT:
Workspace Explorer Sidebar

CENTER:
Markdown Editor

RIGHT:
Live Markdown Preview
----------------------------------------------------

Resizable panels preferred.

====================================================
PERSISTENCE SYSTEM
====================================================

Persist:
- selected workspace
- open files
- editor state
- preview state
- layout state
- recent files

Use:
- IndexedDB
OR
- Electron filesystem persistence

====================================================
AUTOSAVE REQUIREMENTS
====================================================

Autosave:
- after typing pause
- when switching files
- when app loses focus

Avoid:
- blocking UI
- save lag
- typing interruptions

====================================================
UNDO / REDO
====================================================

Implement production-grade:
- undo
- redo

Support:
- Ctrl+Z
- Ctrl+Y
- Cmd+Z
- Cmd+Shift+Z

Undo must work across:
- typing
- paste
- formatting
- file edits

====================================================
PERFORMANCE REQUIREMENTS
====================================================

The app must feel:
- instant
- native
- lightweight
- smooth

Requirements:
- no rerender storms
- isolated editor updates
- debounced preview rendering
- smooth scrolling
- fast file switching

Avoid:
- full app rerenders
- synchronous markdown parsing
- blocking filesystem operations

====================================================
MARKDOWN RENDERING
====================================================

Use:
- react-markdown
- remark-gfm
- rehype-highlight

Support:
- GitHub flavored markdown
- syntax-highlighted code blocks
- tables
- task lists
- images
- links

====================================================
NATIVE DESKTOP FEATURES
====================================================

Implement:
- native menus
- drag-and-drop file opening
- keyboard shortcuts
- native window controls
- Electron dialog APIs

====================================================
UI / UX REQUIREMENTS
====================================================

The app should feel:
- minimal
- compact
- modern
- native
- distraction-free

Use:
- system fonts
- compact spacing
- clean typography
- subtle UI
- smooth resizing

Avoid:
- bloated ribbons
- giant toolbars
- webpage aesthetics
- heavy animations

====================================================
FUTURE-READY ARCHITECTURE
====================================================

Prepare architecture for future:
- tabs
- backlinks
- graph view
- AI assistant
- wiki linking
- plugin system

BUT:
Do NOT implement them now.

====================================================
BUILD REQUIREMENTS
====================================================

Generate COMPLETE PRODUCTION-LEVEL SOURCE CODE:

1. Full folder structure
2. Electron setup
3. React/Vite setup
4. File explorer system
5. Workspace persistence
6. Editor integration
7. Live preview engine
8. Undo/redo system
9. Autosave system
10. Preview maximize mode
11. Performance optimizations
12. Build scripts
13. Electron Builder config
14. README
15. Packaging instructions

====================================================
TARGET PLATFORMS
====================================================

Generate installers for:
- Windows (.exe)
- macOS (.dmg)
- Linux (.deb + AppImage)

====================================================
FINAL PRODUCT GOAL
====================================================

The final application should feel like:

“A lightweight native Markdown workspace IDE for writers and developers.”

Prioritize:
1. typing smoothness
2. workspace stability
3. editor responsiveness
4. preview smoothness
5. file management reliability

NOT feature overload.

=========================================================

**follow prompt 10 strictly and generate code**
The current workspace UI/UX is structurally incorrect and does NOT behave like a real editor workspace.

I need a COMPLETE layout and editor experience overhaul.

====================================================
CORE UX GOAL
====================================================

The application should feel like:
- VSCode
- Notepad++
- Obsidian
- Typora split preview

The user should feel like:
- editing a real file
- viewing a real preview
- managing a real workspace

NOT:
- looking at disconnected panels
- fighting broken layout behavior
- using a webpage prototype

====================================================
1. SIDEBAR RESIZE + WORKSPACE FIX
====================================================

Current problem:
- sidebar cannot resize properly
- workspace tree feels broken
- layout feels locked/static

Fix:
- implement draggable resizable sidebar
- smooth resize behavior
- min/max widths
- collapsible sidebar toggle

Sidebar must:
- feel native
- resize smoothly
- remember width persistently

Use:
- react-resizable-panels
OR
- custom flex resize system

====================================================
2. EDITOR PANEL FIX
====================================================

Current editor panel appears:
- empty
- blocked
- incorrectly sized
- not filling available area

Fix editor layout completely.

Requirements:
- editor fills entire available panel
- full height
- full width
- immediate rendering
- no blocking loading overlay

Editor should behave exactly like:
- Notepad
- VSCode editor
- plain text workspace

====================================================
EDITOR REQUIREMENTS
====================================================

Use:
- Monaco Editor preferred
OR
- CodeMirror 6

Editor must:
- display raw text properly
- instantly show file contents
- support huge files smoothly
- preserve undo/redo
- support markdown syntax highlighting

Most importantly:
Typing must remain ultra-smooth.

====================================================
3. PREVIEW PANEL FIX
====================================================

Current preview feels:
- boxed
- constrained
- webpage-like

Fix preview behavior.

Preview should:
- occupy full available panel
- render like clean document viewer
- use proper markdown typography
- use full panel width naturally
- support smooth scrolling

Preview should feel like:
- GitHub markdown page
- Typora preview
- document reader

NOT:
- tiny embedded card
- boxed widget
- webpage section

====================================================
4. DOUBLE-CLICK LAYOUT MODE
====================================================

VERY IMPORTANT FEATURE.

Double-click behavior:

DOUBLE CLICK EDITOR:
- editor expands fullscreen
- preview hides
- sidebar optional collapse

DOUBLE CLICK PREVIEW:
- preview expands fullscreen
- editor hides
- clean reading mode

DOUBLE CLICK AGAIN:
- restore split layout

This should feel:
- smooth
- native
- instant

====================================================
5. SPLIT VIEW SYSTEM
====================================================

Implement proper split layout engine.

Requirements:
- draggable divider
- persistent panel sizes
- smooth resizing
- responsive layout

Panels:
- Sidebar
- Editor
- Preview

All should resize independently.

====================================================
6. FILE OPENING EXPERIENCE
====================================================

When user clicks file:
- editor instantly loads raw text
- preview instantly updates
- no blank screen
- no stuck loading state

Editor should immediately display:
- markdown source
- text file content
- raw editable text

====================================================
7. PREVIEW RENDERING
====================================================

Preview should:
- debounce updates
- never block typing
- render asynchronously
- smoothly refresh

Preview updates should feel:
- instant
- lightweight
- stable

====================================================
8. NOTEPAD-LIKE UX
====================================================

The app must feel:
- compact
- minimal
- distraction-free
- native desktop application

Use:
- clean system fonts
- compact spacing
- subtle separators
- smooth resizing

Avoid:
- giant empty spaces
- webpage aesthetics
- excessive padding
- oversized cards

====================================================
9. PERFORMANCE REQUIREMENTS
====================================================

Optimize:
- editor rendering
- preview rendering
- sidebar rendering
- file switching

Avoid:
- full app rerenders
- layout thrashing
- resize lag
- blocking markdown parsing

====================================================
10. FINAL UX TARGET
====================================================

NORMAL MODE:
----------------------------------------------------
LEFT  = workspace explorer
CENTER = markdown editor
RIGHT = markdown preview
----------------------------------------------------

DOUBLE CLICK:
- fullscreen editor
OR
- fullscreen preview

The experience should feel like:
- professional markdown IDE
- lightweight native editor
- stable daily writing tool

NOT:
- experimental React layout
- prototype markdown app
- webpage dashboard