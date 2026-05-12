Refactor the File → Open menu into a PROFESSIONAL workspace-aware submenu system.

====================================================
CURRENT PROBLEM
====================================================

Right now:

File
→ Open...

behaves only like:
- a basic file picker

This is NOT the desired UX.

====================================================
NEW REQUIRED MENU STRUCTURE
====================================================

File
 ├── New
 ├── Open >
 │     ├── Default Workspace
 │     ├── ----------------
 │     ├── Recent Workspace 1
 │     ├── Recent Workspace 2
 │     ├── Recent Workspace 3
 │     ├── ----------------
 │     └── Browse...
 ├── Save
 ├── Save As
 └── Exit

====================================================
OPEN SUBMENU REQUIREMENTS
====================================================

The "Open" item must:
- show a right-arrow submenu indicator
- open submenu on hover
- behave like native desktop applications

The submenu should feel:
- lightweight
- native
- responsive
- Electron-native

====================================================
DEFAULT WORKSPACE ENTRY
====================================================

The FIRST item inside Open must always be:
- the active default workspace

Example:
----------------------------------------------------
Open >
   Default Workspace
   D:/MarkdownWorkspace
----------------------------------------------------

Requirements:
- visually distinct
- shown at top
- clickable
- opens current workspace instantly

====================================================
RECENT WORKSPACES
====================================================

Below default workspace:
show previously visited directories.

Requirements:
- persistent history
- recent-first ordering
- duplicate prevention
- path persistence across restarts

When clicked:
- switch workspace instantly
- refresh explorer
- reopen workspace

====================================================
BROWSE OPTION
====================================================

Add:
Browse...

When clicked:
- open native directory picker
- allow selecting another workspace
- save into recent history
- switch workspace immediately

====================================================
SAVE DIALOG BEHAVIOR
====================================================

VERY IMPORTANT:

Whenever user:
- Save
- Save As
- create markdown file

The default save location must ALWAYS open inside:
the ACTIVE workspace directory.

Example:
----------------------------------------------------
Current Workspace:
D:/MarkdownWorkspace

Save dialog opens there automatically.
----------------------------------------------------

User MAY still:
- navigate elsewhere manually
- save elsewhere manually

BUT:
default initial path MUST ALWAYS be:
the active workspace.

====================================================
WORKSPACE MEMORY SYSTEM
====================================================

Persist:
- active workspace
- recent workspaces
- last opened workspace

On startup:
- automatically reopen last workspace

====================================================
UI / UX REQUIREMENTS
====================================================

The submenu should feel:
- native desktop
- VSCode-like
- clean
- compact

Avoid:
- webpage dropdown behavior
- oversized menus
- laggy submenu rendering

====================================================
FINAL UX TARGET
====================================================

The Open menu should feel like:
- a professional workspace launcher
- a native desktop workspace system
- a markdown-focused project navigator

The user should instantly:
- reopen previous workspaces
- switch workspaces quickly
- always know where files are being saved

This is one of the FINAL V1 workflow polish features.