The workspace explorer sidebar is STILL structurally incorrect.

Right now it behaves like:
- a collapsed icon rail
- a minimized navigation strip
- a hidden toolbar

This is WRONG.

====================================================
CORE ISSUE
====================================================

The sidebar width/layout system is still broken.

The explorer should behave like:
- VSCode Explorer
- Obsidian File Tree
- native workspace navigator

NOT:
- tiny collapsed strip
- icon-only sidebar
- hidden panel

====================================================
REQUIRED FIX
====================================================

The LEFT workspace explorer panel must open FULLY EXPANDED by default.

Default width should be approximately:
- 240px minimum
- 280px preferred
- 320px maximum default

The sidebar should:
- comfortably show folder names
- comfortably show markdown file names
- support nested folders visibly
- feel spacious enough for workspace navigation

====================================================
IMPORTANT LAYOUT REQUIREMENT
====================================================

The layout should be:

----------------------------------------------------
LEFT:
FULL workspace explorer

CENTER:
Editor

RIGHT:
Preview
----------------------------------------------------

The explorer should NEVER appear as:
- tiny strip
- collapsed icon rail
- hidden sidebar

====================================================
SIDEBAR RESIZE SYSTEM
====================================================

Implement proper resize behavior:
- drag handle
- smooth resizing
- min width
- max width
- persistent width memory

Preferred:
- react-resizable-panels
OR
- proper flex-based resizable layout

====================================================
COLLAPSE / EXPAND BEHAVIOR
====================================================

The explorer should support:

EXPANDED MODE:
- full file tree visible

COLLAPSED MODE:
- thin icon rail optional

Toggle behavior:
- click button → collapse
- click again → restore previous width

IMPORTANT:
Expanded mode should be the DEFAULT startup state.

====================================================
FILE TREE VISIBILITY
====================================================

The file explorer must clearly display:
- folders
- nested folders
- .md files
- .markdown files
- .txt files

All labels must be:
- readable
- unclipped
- properly padded

====================================================
REMOVE VISUAL CLUTTER
====================================================

Avoid:
- oversized borders
- giant separators
- dashboard look
- excessive padding

Use:
- compact workspace UI
- subtle separators
- native-feeling spacing

====================================================
FINAL UX TARGET
====================================================

The workspace explorer should feel like:
- a real filesystem navigator
- a professional writing workspace
- a usable markdown project explorer

NOT:
- an icon dock
- hidden menu
- experimental sidebar

This is one of the MOST IMPORTANT UX fixes remaining for V1.