We are implementing the FINAL major V1 feature:

CENTRALIZED WORKSPACE STORAGE SYSTEM

This feature is EXTREMELY IMPORTANT.

====================================================
CORE PRODUCT IDEA
====================================================

The application should revolve around:
ONE PRIMARY WORKSPACE DIRECTORY.

All markdown workflows should be centered around this directory.

The workspace directory acts as:
- primary markdown storage
- cache location
- project workspace
- default save location
- session persistence root

====================================================
PRIMARY REQUIREMENT
====================================================

During FIRST APP SETUP or INSTALLATION:

Prompt the user to choose:
- a primary workspace directory
OR
- create a default markdown workspace folder

Examples:
- Documents/MarkPad
- Desktop/MarkdownWorkspace
- Custom user-selected directory

====================================================
WORKSPACE DIRECTORY RESPONSIBILITIES
====================================================

The selected workspace directory becomes:

- default markdown save location
- default new-file location
- cache location
- autosave location
- workspace restore location
- recent files reference location

====================================================
DEFAULT SAVE BEHAVIOR
====================================================

VERY IMPORTANT:

When user clicks:
- Save
- Save As
- New Markdown File

The file dialog should OPEN inside:
the current workspace directory by default.

User MAY still:
- save elsewhere manually
- choose another location manually

BUT:
the default location should ALWAYS be:
the active workspace directory.

====================================================
WORKSPACE MEMORY SYSTEM
====================================================

The application must REMEMBER:

- previous workspace directories
- recently opened workspaces
- last active workspace
- workspace switching history

Implement:
- recent workspace list
- workspace restore on startup
- quick workspace switching

====================================================
MULTIPLE WORKSPACE SUPPORT
====================================================

The app should support:
- multiple remembered workspace directories

BUT:
only ONE active workspace at a time in V1.

The user should be able to:
- switch workspaces
- reopen recent workspaces
- remember previous workspace locations

====================================================
FILE EXPLORER BEHAVIOR
====================================================

The explorer should ONLY display:
- .md
- .markdown
- .txt

inside the active workspace.

Ignore:
- system files
- binaries
- build files
- hidden junk files

====================================================
CACHE / TEMP STORAGE
====================================================

All temporary application data should also live under:
the active workspace system.

Examples:
- autosave snapshots
- cache files
- temporary recovery files
- session state

Organize cleanly.

Possible structure:

Workspace/
 ├── Notes/
 ├── Drafts/
 ├── Cache/
 ├── Recovery/
 ├── Recent/
 └── .markpad/

====================================================
WORKSPACE CONFIGURATION
====================================================

Persist workspace metadata:

- last opened files
- panel layout
- preview mode
- sidebar width
- recent documents
- session state

====================================================
WORKSPACE STARTUP FLOW
====================================================

APP START:
----------------------------------------------------
IF workspace exists:
→ reopen last workspace

IF no workspace configured:
→ prompt user to choose/create workspace
----------------------------------------------------

====================================================
USER EXPERIENCE REQUIREMENTS
====================================================

The workspace system should feel:
- automatic
- organized
- predictable
- safe
- native

The user should NEVER:
- lose markdown files
- wonder where files are saved
- deal with scattered storage

====================================================
SAVE SYSTEM REQUIREMENTS
====================================================

When saving:
- default directory = active workspace
- filename suggestions supported
- autosave uses workspace cache
- recovery snapshots use workspace cache

====================================================
FUTURE READY
====================================================

Prepare architecture for future:
- multiple simultaneous workspaces
- vault system
- workspace indexing
- graph relationships
- global search

BUT:
Do NOT implement those yet.

====================================================
PERFORMANCE REQUIREMENTS
====================================================

Workspace scanning should:
- be asynchronous
- avoid UI blocking
- ignore unnecessary folders
- remain fast with many markdown files

====================================================
FINAL V1 GOAL
====================================================

The final product should feel like:

“A native Markdown workspace IDE with centralized document organization.”

Core experience:
- choose workspace
- create markdown files
- everything saves into organized workspace
- workspace automatically restores
- markdown workflow feels predictable and clean

====================================================
IMPORTANT
====================================================

DO NOT overengineer.

Focus on:
1. stable workspace storage
2. predictable save behavior
3. workspace restoration
4. smooth file management
5. organized markdown workflow

This is the FINAL major V1 architecture feature.