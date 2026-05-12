Build a production-grade cross-platform desktop Markdown editor using:

- Electron
- React
- TypeScript
- Vite
- TailwindCSS
- CodeMirror 6
- Electron Builder

The application must work on:

- Windows (.exe installer)
- macOS (.dmg)
- Linux Ubuntu (.deb and AppImage)

====================================================
CORE PRODUCT IDEA
====================================================

The app should feel like a modern native version of Windows Notepad, but with built-in Markdown rendering.

The experience must be:
- minimal
- fast
- offline-first
- distraction-free
- native-feeling
- lightweight
- keyboard-focused

No bloated UI.
No web-app feeling.
No unnecessary animations.

====================================================
UI / DESIGN REQUIREMENTS
====================================================

The interface should closely resemble classic Windows Notepad:

- plain white background
- native system fonts
- minimal top menu bar
- clean title bar
- no heavy borders
- no sidebar unless toggled
- responsive resizing
- extremely fast startup

Layout:
----------------------------------------------------
OPTION A:
- left side = Markdown editor
- right side = live rendered preview

OPTION B:
- single editor with live markdown styling

Allow toggling between:
- editor only
- split view
- preview only

Use native-feeling spacing and menus.

====================================================
EDITOR REQUIREMENTS
====================================================

Use CodeMirror 6 as the editor engine.

Features:
- syntax highlighting
- Markdown shortcuts
- auto-indent
- line wrapping
- undo/redo
- keyboard shortcuts
- smooth scrolling
- large file support

When the user pastes Markdown text:
- immediately render Markdown in preview
- no refresh required
- no save required

Support:
- bold
- italic
- headings
- code blocks
- blockquotes
- checklists
- tables
- links
- images
- inline code

====================================================
FILE SYSTEM FEATURES
====================================================

Implement native Electron file system integration.

Required:
- New File
- Open File
- Save
- Save As
- Recent Files
- Drag and Drop file open

Supported extensions:
- .md
- .markdown
- .txt

Use Electron dialog API.

====================================================
NATIVE MENUS
====================================================

Create native desktop menus:

File
- New
- Open
- Save
- Save As
- Exit

Edit
- Undo
- Redo
- Cut
- Copy
- Paste
- Find

View
- Toggle Preview
- Zoom In
- Zoom Out
- Reset Zoom
- Toggle Fullscreen

Help
- About

Menus should behave like native apps on:
- Windows
- macOS
- Linux

====================================================
ARCHITECTURE
====================================================

Use clean scalable architecture:

/electron
/src
/components
/hooks
/services
/store
/utils

Use:
- preload scripts
- contextBridge
- secure IPC communication

Electron security requirements:
- contextIsolation enabled
- nodeIntegration disabled
- secure preload exposure

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

====================================================
SETTINGS SYSTEM
====================================================

Implement persistent local settings:

- dark/light mode
- font size
- word wrap
- autosave
- preview toggle
- editor width ratio

Persist settings locally using:
- electron-store

====================================================
PERFORMANCE REQUIREMENTS
====================================================

App startup:
- under 2 seconds

Memory efficient:
- avoid unnecessary rerenders

Must feel native and smooth on:
- low-end Windows laptops
- Ubuntu systems
- macOS

====================================================
PACKAGING
====================================================

Configure Electron Builder for:

Windows:
- NSIS installer (.exe)

macOS:
- .dmg

Linux:
- .deb
- AppImage

Generate build scripts.

====================================================
DELIVERABLES
====================================================

Generate:

1. Full folder structure
2. package.json
3. Electron main process
4. preload.ts
5. React renderer setup
6. Tailwind config
7. Markdown editor component
8. Live preview component
9. File menu implementation
10. IPC handlers
11. Electron Builder config
12. Build scripts
13. README.md
14. Installation instructions
15. Packaging instructions

====================================================
BONUS FEATURES
====================================================

If possible include:
- autosave recovery
- tabs
- command palette
- export to HTML/PDF
- spellcheck
- Zen mode
- typewriter mode

====================================================
FINAL GOAL
====================================================

The final product should feel like:

“Windows Notepad + Obsidian Lite + Typora simplicity”

It should be simple enough for normal users but powerful enough for developers and writers.







============================================================
**new prompt**
Build a desktop-grade Markdown editor with REAL-TIME INCREMENTAL MARKDOWN COMPILATION behavior.

The editor must NOT behave like a normal markdown preview pane.

I want a hybrid editing/rendering engine similar to:
- Typora
- Notion block rendering
- streaming markdown rendering
- live paragraph compilation

====================================================
CORE BEHAVIOR (MOST IMPORTANT)
====================================================

The editor must work like this:

1. While typing:
- text stays in raw editable markdown form
- user sees raw markdown syntax while actively editing

Example:
**hello

should remain raw while incomplete.

====================================================
INSTANT COMPILE TRIGGERS
====================================================

The editor should instantly compile ONLY the completed block when:

- user presses Enter
- user presses Shift+Enter
- user leaves the line
- user pauses typing for 300–500ms
- paragraph loses focus
- markdown syntax becomes valid/closed

====================================================
EXAMPLES
====================================================

Example 1:
User types:

# Hello World

and presses Enter

Immediately convert/render that line as:
H1 rendered markdown block.

----------------------------------------------------

Example 2:
User types:

**bold text**

Immediately render it after:
- closing **
AND
- Enter or pause typing

----------------------------------------------------

Example 3:
User types:

```js

DO NOT render yet because code block is incomplete.

Wait until:
``` closes

then instantly render entire block.

----------------------------------------------------

Example 4:
User types:

- item 1
- item 2

Render list incrementally line-by-line.

====================================================
EDITOR EXPERIENCE
====================================================

The editor should feel:
- instant
- zero-latency
- native
- smooth
- block-based
- intelligent

NOT like:
- traditional textarea
- laggy web markdown preview
- refresh-based rendering

====================================================
RENDERING ARCHITECTURE
====================================================

Use a BLOCK-BASED INCREMENTAL PARSER.

Each paragraph/block should exist as:

{
  id,
  rawMarkdown,
  renderedHTML,
  isEditing,
  isValidMarkdown,
  type
}

Only compile changed blocks.

DO NOT re-render entire document on every keystroke.

====================================================
SMART MARKDOWN DETECTION
====================================================

The editor must intelligently detect incomplete markdown syntax.

Examples of incomplete syntax:
- unclosed **
- unclosed *
- unclosed `
- unclosed ```
- unfinished tables
- unfinished links
- unfinished images

Incomplete markdown should:
- remain editable
- remain raw text
- NOT render prematurely

====================================================
RENDER PIPELINE
====================================================

Use this workflow:

Typing →
Debounce →
Syntax Validation →
Block Completion Detection →
Incremental Markdown Compile →
Replace Raw Block With Rendered Block

====================================================
EDITING RENDERED BLOCKS
====================================================

When user clicks a rendered block:
- revert block back into editable markdown source
- cursor placed exactly where clicked

When focus leaves:
- compile again

Exactly like Typora-style inline markdown editing.

====================================================
TECH STACK
====================================================

Use:
- Electron
- React
- TypeScript
- Vite
- TailwindCSS

Editor Engine:
- CodeMirror 6 OR ProseMirror

Markdown Parsing:
- unified
- remark
- remark-gfm
- rehype-highlight

====================================================
PERFORMANCE REQUIREMENTS
====================================================

Must support:
- instant rendering
- large markdown files
- minimal rerenders
- block virtualization if needed

Avoid:
- full document rerender
- lag after pressing Enter
- flickering
- cursor jumps

====================================================
UI REQUIREMENTS
====================================================

The UI should look like:
- Windows Notepad
- clean white background
- native fonts
- minimal toolbar
- no bloated sidebar
- no web-app feeling

====================================================
IMPORTANT
====================================================

This is NOT a traditional markdown preview app.

It is a REAL-TIME HYBRID MARKDOWN COMPILER/EDITOR.

The rendering engine must behave intelligently and incrementally.

The user should feel like markdown transforms live as thoughts are completed.






==============================================================
prompt 3 

The current implementation has major editor-engine UX problems.

Fix the architecture and rendering behavior to make the app behave like a REAL desktop editor instead of a webpage renderer.

====================================================
CRITICAL ISSUES TO FIX
====================================================

1. Vertical spacing is WAY too large.
2. Every line/block has excessive height.
3. Rendering feels disconnected from editing.
4. Existing rendered blocks cannot be edited properly.
5. Cursor flow feels broken.
6. The editor feels like separate HTML chunks instead of one continuous document.
7. Clicking rendered content does not smoothly transition back into editable markdown.

====================================================
DESIRED EDITOR EXPERIENCE
====================================================

The editor should behave like:
- Typora
- Notion
- native document editor
- continuous flowing document

NOT like:
- stacked webpage cards
- isolated HTML containers
- giant paragraph blocks
- preview renderer

====================================================
LAYOUT FIXES
====================================================

Reduce ALL excessive spacing.

Requirements:
- line-height: tight and document-like
- paragraph spacing: minimal
- heading margins: compact
- list spacing: compact
- no giant gaps between blocks
- blocks should visually feel connected

Target feeling:
- Windows Notepad
- Obsidian Live Preview
- compact writing environment

====================================================
IMPORTANT VISUAL REQUIREMENT
====================================================

The document must visually feel like ONE flowing editable page.

NOT:
[block]
[gap]
[block]
[gap]

Instead:
continuous writing surface.

====================================================
EDITING FIX (VERY IMPORTANT)
====================================================

Currently rendered blocks cannot be edited naturally.

Fix this behavior:

WHEN USER CLICKS ANY RENDERED CONTENT:
- instantly switch that block into markdown edit mode
- preserve cursor position
- preserve text selection
- focus editor immediately
- no flicker
- no layout jump

WHEN USER LEAVES BLOCK:
- recompile markdown
- return to rendered mode

Exactly like Typora inline editing.

====================================================
RENDERING OPTIMIZATION
====================================================

Do NOT render every block as separate heavy React container.

Optimize rendering:
- memoize blocks
- only rerender changed block
- avoid full document rerender
- avoid remounting editors
- preserve editor instances when possible

====================================================
BLOCK STRUCTURE FIX
====================================================

Current structure is too isolated.

Instead implement:

Document
 └── FlowContainer
      └── InlineEditableBlocks

Blocks should visually merge into one document.

====================================================
EDITOR HEIGHT FIX
====================================================

Remove excessive min-height.

Each block height should:
- auto-fit content
- behave like natural text lines
- compact like native editors

NO:
- huge empty margins
- giant editable zones
- oversized containers

====================================================
TEXTAREA / EDITOR FIX
====================================================

While editing:
- editor should appear inline
- same typography as rendered text
- no giant boxes
- transparent background
- no borders
- seamless transition

====================================================
TYPOGRAPHY SETTINGS
====================================================

Use:
- system font
- font-size: 15px or 16px
- line-height: 1.4–1.5
- compact paragraph spacing

Headings:
- bold
- compact margins

Lists:
- tight spacing

Code blocks:
- slightly separated
- not oversized

====================================================
OPEN FILE EDITING BUG
====================================================

Currently opened files become difficult/impossible to edit.

Fix the document hydration system.

When opening a file:
- parse markdown into editable blocks
- preserve raw markdown source
- allow ALL loaded blocks to re-enter edit mode
- clicking any loaded block should reopen markdown editing

Loaded files must behave EXACTLY like newly typed content.

====================================================
IMPORTANT
====================================================

This is NOT a markdown preview application.

It is a REAL-TIME EDITABLE DOCUMENT ENGINE.

The document must feel:
- continuous
- fluid
- editable everywhere
- compact
- native
- instantaneous

The user should forget where rendering starts and editing ends.


=======================================================
**prompt 4**
The current slash-command implementation is architecturally wrong.

Right now, every Enter creates persistent empty placeholder blocks like:

"Type '/' for commands or start typing..."

This behavior is BAD UX and breaks the continuous writing experience.

====================================================
REMOVE THIS COMPLETELY
====================================================

Delete:
- repeated placeholder blocks
- persistent empty command prompts
- stacked empty editable nodes
- automatic placeholder generation after Enter

The editor should NEVER fill the page with empty command blocks.

====================================================
DESIRED BEHAVIOR
====================================================

The document should behave like a NORMAL continuous editor.

Pressing Enter should:
- create a clean empty line
- preserve writing flow
- NOT create visible placeholder cards
- NOT create giant empty blocks

Empty lines should remain visually minimal like:
- Notepad
- Typora
- Obsidian

====================================================
SLASH COMMAND SYSTEM (CORRECT IMPLEMENTATION)
====================================================

I want a floating slash-command palette.

WHEN USER TYPES:
/

inside an active editable block:

SHOW:
- floating dropdown menu
- positioned directly BELOW the current cursor
- aligned near the typing location
- NOT inserted into the document itself

====================================================
DROPDOWN POSITIONING
====================================================

The command dropdown should appear:
- directly below typing cursor
- near top-left of current typing area
- under the ribbon/menu bar area if near top
- floating overlay above editor

Like:
- Notion slash menu
- VSCode autocomplete
- Cursor AI command palette

====================================================
COMMAND MENU REQUIREMENTS
====================================================

The dropdown must:
- float above content
- have rounded corners
- subtle shadow
- keyboard navigation
- searchable commands
- instant filtering while typing

====================================================
EXAMPLE
====================================================

User types:

/

Immediately show:

--------------------------------
| Heading 1                  |
| Heading 2                  |
| Bullet List                |
| Numbered List              |
| Checklist                  |
| Code Block                 |
| Quote                      |
| Table                      |
| Divider                    |
| Image                      |
--------------------------------

====================================================
SEARCH/FILTER BEHAVIOR
====================================================

Typing:
"/he"

should filter instantly to:
- Heading 1
- Heading 2

Typing:
"/co"

should filter:
- Code Block

====================================================
KEYBOARD CONTROLS
====================================================

Support:
- Arrow Up/Down
- Enter to select
- Escape to close
- Tab completion

====================================================
INSERTION BEHAVIOR
====================================================

When command selected:
- replace slash command text
- insert markdown structure
- keep cursor focused
- continue writing instantly

Example:
"/table"

becomes:

| Column | Column |
|--------|--------|
|        |        |

====================================================
IMPORTANT UX REQUIREMENTS
====================================================

The slash menu must feel:
- instantaneous
- lightweight
- native
- unobtrusive

It must NOT:
- push document downward
- create layout shifts
- create empty blocks
- alter document flow

====================================================
ARCHITECTURE REQUIREMENT
====================================================

Implement slash menu as:
- floating portal component
- absolute/fixed positioned overlay
- NOT part of document flow

Use:
- React Portal
OR
- Floating UI library

====================================================
EMPTY LINE FIX
====================================================

Empty lines should:
- stay compact
- maintain natural document spacing
- behave like real text editor lines

NOT:
- giant editable containers
- repeated prompts
- visual placeholders

====================================================
FINAL GOAL
====================================================

The editor should feel like:
- a professional writing tool
- continuous document surface
- intelligent command system

NOT like:
- stacked React cards
- block playground
- prototype UI

The user should barely notice the command system exists until typing "/".


===========================================
**prompt 5**
The editor architecture is still fundamentally incorrect.

Right now the app behaves like:
- static HTML rendering
- one-way markdown conversion
- frozen rendered output

This is WRONG.

I want a REAL editable markdown document engine.

====================================================
CRITICAL PROBLEMS TO FIX
====================================================

1. Pasted markdown does NOT auto-render.
2. Pressing Enter after paste does NOT compile blocks correctly.
3. Rendered markdown becomes non-editable frozen HTML.
4. Editing lifecycle is broken.
5. Markdown rendering is treated as final output instead of editable state.
6. The app still feels like a webpage renderer instead of Notepad.

====================================================
CORE ARCHITECTURE CHANGE
====================================================

The editor must use a TWO-WAY editable document model.

NOT:
Markdown → HTML

Instead:
Markdown ⇄ Editable Rendered Document

Rendered blocks must NEVER become dead HTML.

EVERY rendered block must ALWAYS preserve:
- raw markdown source
- editable state
- cursor recovery
- selection recovery

====================================================
PASTE HANDLING (VERY IMPORTANT)
====================================================

When user pastes markdown:

Example:
# Hello

**bold**

- item

The editor should:
1. detect pasted markdown
2. split content into blocks
3. instantly parse markdown
4. immediately render valid blocks
5. preserve editable markdown internally

NO manual refresh.
NO save required.
NO additional Enter presses required.

====================================================
ENTER-TRIGGER COMPILATION FIX
====================================================

Current Enter behavior is broken.

Correct behavior:

WHEN USER PRESSES ENTER:
- current block should validate markdown
- if syntax complete → instantly render block
- if syntax incomplete → remain editable markdown

Examples:

VALID:
**bold**
→ compile immediately

INVALID:
**bold
→ stay raw editable markdown

====================================================
INLINE EDITING SYSTEM
====================================================

Rendered markdown MUST remain editable.

WHEN USER:
- clicks rendered heading
- clicks rendered paragraph
- clicks rendered list
- clicks rendered table

THEN:
- instantly revert ONLY that block into markdown edit mode
- place cursor naturally
- allow editing immediately
- preserve formatting state

WHEN USER FINISHES:
- instantly re-render block

Exactly like:
- Typora
- Obsidian Live Preview
- Notion inline editing

====================================================
DOCUMENT MODEL
====================================================

Every block must store:

{
  id,
  rawMarkdown,
  renderedHtml,
  editing,
  compiled,
  markdownType
}

IMPORTANT:
Never throw away raw markdown after rendering.

====================================================
RENDERING FIX
====================================================

Current rendering behaves like separate HTML output chunks.

Instead:
- create ONE flowing editable document surface
- seamless transitions between editing and rendering
- rendering should feel invisible

====================================================
NOTEPAD UX REQUIREMENTS
====================================================

The editor should feel like:
- Windows Notepad
- native text editor
- instant typing surface

NOT:
- webpage preview
- React cards
- blog renderer
- HTML output viewer

====================================================
TEXT EDITING REQUIREMENTS
====================================================

Typing should feel:
- immediate
- low latency
- continuous
- uninterrupted

No:
- flicker
- remounting
- cursor jumps
- focus loss

====================================================
MARKDOWN LIVE PREVIEW BEHAVIOR
====================================================

Behavior target:

While typing:
- markdown remains raw if incomplete

After completion:
- markdown visually transforms

Examples:

Typing:
# Heading

Press Enter:
→ transforms into rendered H1

Click heading:
→ becomes editable "# Heading"

Blur/focus out:
→ renders again

====================================================
IMPORTANT
====================================================

This app is NOT:
- a markdown previewer
- a static renderer
- a split-pane editor

This app IS:
- a live editable markdown document engine
- a real-time markdown compiler
- a Notepad-like writing experience with invisible markdown rendering

The user should never feel trapped inside rendered HTML.
=========================================================
**prompt 6**
Upgrade the editor into a REAL desktop-grade writing engine with professional editing UX.

====================================================
NEW CORE REQUIREMENTS
====================================================

Add:
- Undo / Redo system
- Persistent document cache
- Editing history
- Inline formatting toolbar
- Smooth markdown editing UX
- Native editor interactions
- Autosave + crash recovery

The editor should feel like:
- Notepad
- Typora
- Obsidian Live Preview
- lightweight native writing software

NOT like:
- webpage renderer
- HTML preview app
- prototype markdown demo

====================================================
1. UNDO / REDO SYSTEM (CRITICAL)
====================================================

Implement professional undo/redo behavior.

Requirements:
- Ctrl+Z → Undo
- Ctrl+Y → Redo
- Cmd+Z / Cmd+Shift+Z on macOS
- preserve cursor position
- preserve block state
- preserve markdown formatting state

Undo/redo must work across:
- typing
- rendering
- block splits
- block merges
- toolbar formatting
- paste operations

====================================================
UNDO ENGINE REQUIREMENTS
====================================================

Use:
- operation history stack
OR
- transactional editor state system

Store:
{
  operationType,
  beforeState,
  afterState,
  cursorState,
  timestamp
}

Avoid:
- full document cloning on every keystroke
- memory-heavy snapshots

Use:
- incremental history entries
- debounced state checkpoints

====================================================
2. DOCUMENT CACHE / PERSISTENCE LAYER
====================================================

Implement a lightweight document persistence engine.

Requirements:
- autosave
- crash recovery
- fast restoration
- local document cache
- memory-efficient storage

Use:
- IndexedDB
OR
- electron-store
OR
- local persistent cache layer

====================================================
CACHE SYSTEM BEHAVIOR
====================================================

While typing:
- periodically save editor state
- preserve unsaved work
- recover after crash/restart

The editor should NEVER lose user text.

====================================================
AUTOSAVE REQUIREMENTS
====================================================

Autosave triggers:
- after typing pause
- after block compilation
- after paste
- after formatting operations

Use:
- debounced autosave
- background persistence

NO:
- UI freezing
- save lag
- blocking operations

====================================================
3. INLINE FORMATTING TOOLBAR
====================================================

Add a lightweight formatting toolbar like modern editors.

The toolbar should appear:
- at top ribbon
OR
- floating near selected text

NOT:
- giant Word-style ribbon
- bloated toolbar

====================================================
TOOLBAR ACTIONS
====================================================

Support:
- Bold
- Italic
- Strikethrough
- Inline Code
- Heading
- Bullet List
- Numbered List
- Checklist
- Quote
- Code Block
- Link
- Table

====================================================
MARKDOWN CONVERSION BEHAVIOR
====================================================

When user highlights text and clicks:

BOLD

Convert:
hello

into:
**hello**

Then instantly render if valid.

====================================================
INLINE EDITING REQUIREMENT
====================================================

Formatting actions must:
- preserve cursor
- preserve selection
- remain editable
- update markdown source internally

NO frozen HTML.

====================================================
4. NOTEPAD-LIKE UX
====================================================

The editor should feel:
- minimal
- native
- distraction-free
- keyboard-first
- extremely fast

Requirements:
- compact menus
- smooth typing
- instant response
- no layout jumps
- no giant spacing
- clean typography

====================================================
5. DOCUMENT ENGINE REQUIREMENT
====================================================

The editor is NOT:
- a webpage
- a markdown renderer
- a preview application

It IS:
- a persistent editable document engine
- a markdown-aware writing system
- a real-time markdown compiler

====================================================
6. PERFORMANCE REQUIREMENTS
====================================================

Optimize:
- history stack
- rerendering
- autosave
- block updates

Avoid:
- full rerenders
- excessive React state updates
- giant object cloning
- lag during typing

====================================================
7. FUTURE-PROOF ARCHITECTURE
====================================================

Prepare architecture for future features:
- file explorer
- tabs
- workspace folders
- backlinks
- graph view
- plugins

BUT:
Do NOT implement those yet.

Focus ONLY on:
- writing experience
- editor reliability
- state persistence
- undo/redo correctness

====================================================
FINAL GOAL
====================================================

The editor should feel like:

“Native Notepad with invisible real-time Markdown intelligence.”

The user should:
- type naturally
- format instantly
- recover edits safely
- undo everything confidently
- never think about markdown mechanics



====================================================
**prompt 6**
The editor currently feels laggy, sticky, and heavy while typing.

This is unacceptable.

The typing experience must become as smooth and responsive as:
- Windows Notepad
- VSCode
- Obsidian
- Typora

====================================================
CRITICAL PROBLEM
====================================================

The current architecture is causing:
- excessive rerenders
- typing lag
- input delay
- cursor stutter
- blocked UI updates
- heavy markdown recompilation

The editor currently prioritizes rendering over typing responsiveness.

THIS IS WRONG.

====================================================
NEW PRIORITY ORDER
====================================================

Typing responsiveness MUST ALWAYS have highest priority.

Priority order:

1. Typing smoothness
2. Cursor responsiveness
3. Scroll smoothness
4. Editing continuity
5. Markdown rendering

Markdown rendering should NEVER block typing.

====================================================
CORE PERFORMANCE REQUIREMENT
====================================================

Typing must feel:
- instant
- zero-latency
- native
- uninterrupted

Even on:
- large documents
- many markdown blocks
- pasted content

====================================================
ARCHITECTURE FIX
====================================================

Separate:
- typing engine
FROM
- markdown rendering engine

The editor must NOT:
- fully parse markdown on every keystroke
- rerender entire React tree
- rebuild blocks while typing

====================================================
NEW RENDERING STRATEGY
====================================================

Use deferred rendering.

While user types:
- prioritize raw editing performance
- suspend expensive rendering
- debounce markdown compilation

Only compile:
- after short typing pause
- Enter press
- block completion
- blur/focus loss

====================================================
CRITICAL IMPLEMENTATION RULE
====================================================

DO NOT use React state for every character update.

Use:
- mutable editor refs
- local editing buffers
- isolated editor state

Only sync React state:
- after stable edits
- after block completion
- after debounce

====================================================
BLOCK RENDERING OPTIMIZATION
====================================================

Only rerender:
- changed block
- directly affected neighboring blocks

NEVER rerender:
- entire document
- toolbar
- unrelated blocks

====================================================
AVOID THESE PERFORMANCE KILLERS
====================================================

DO NOT:
- remount editor components
- regenerate HTML continuously
- recreate block arrays on every keystroke
- trigger global state updates while typing
- run markdown parser per character
- use expensive DOM measurements repeatedly

====================================================
USE PERFORMANCE TECHNIQUES
====================================================

Implement:
- memoized blocks
- requestAnimationFrame scheduling
- debounced markdown compilation
- incremental parsing
- isolated editor instances
- lazy rendering

====================================================
EDITOR ENGINE REQUIREMENT
====================================================

The editing surface should behave like:
- a lightweight text engine
- continuous native document input

NOT:
- React-controlled textarea system
- webpage rendering loop

====================================================
TOOLBAR OPTIMIZATION
====================================================

Toolbar updates must:
- NOT rerender on every keypress
- remain lightweight
- update only when selection changes

====================================================
SCROLL PERFORMANCE
====================================================

Scrolling must remain:
- smooth
- GPU accelerated
- uninterrupted

Avoid:
- layout thrashing
- excessive height recalculations
- DOM reflow storms

====================================================
MARKDOWN COMPILATION REQUIREMENT
====================================================

Markdown rendering should feel:
- invisible
- background-processed
- secondary to typing

The user should NEVER feel rendering happening.

====================================================
DEBUGGING REQUIREMENT
====================================================

Add performance instrumentation.

Track:
- rerender counts
- typing latency
- block render frequency
- markdown parse time

Detect:
- unnecessary rerenders
- expensive operations
- blocked main thread activity

====================================================
FINAL UX TARGET
====================================================

The editor should feel like:
- typing directly into native memory
- frictionless writing
- immediate character response

The user should forget:
- React exists
- markdown parsing exists
- rendering exists

The editor should feel faster than the user can think.