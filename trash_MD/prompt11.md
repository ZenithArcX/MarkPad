The current application direction is now correct.

We are FINALIZING the V1 workspace UX and layout behavior.

The app already feels much closer to a real Markdown workspace IDE, but several important UX refinements are still needed.

====================================================
1. FILE EXPLORER SIDEBAR WIDTH FIX
====================================================

Current issue:
- workspace explorer sidebar is too thin
- difficult to navigate
- visually weak
- folder names feel cramped

Fix:
- increase default sidebar width
- improve readability
- make folder/file names comfortable to scan

Requirements:
- proper default width
- resizable sidebar
- smooth resize drag behavior
- persistent width memory

Sidebar should feel like:
- VSCode explorer
- Obsidian file tree
- native workspace navigator

====================================================
2. SIDEBAR TOGGLE BUTTON
====================================================

Add a proper sidebar toggle button.

Requirements:
- click to collapse sidebar
- click again to reopen sidebar
- smooth transition
- preserve previous sidebar width
- instant toggle behavior

The toggle should:
- feel native
- stay accessible
- not break layout

Preferred placement:
- top-left toolbar/header area

====================================================
3. FILE FILTERING (VERY IMPORTANT)
====================================================

The explorer should ONLY show:
- .md
- .markdown
- .txt

Ignore ALL unrelated files.

DO NOT display:
- node_modules
- binaries
- images
- hidden system files
- build folders
- package-lock files
- random project files

The explorer must remain:
- clean
- focused
- writing-oriented

====================================================
4. FOLDER FILTERING
====================================================

Ignore unnecessary folders:
- node_modules
- .git
- dist
- build
- .vite
- .cache

Only display relevant workspace folders.

====================================================
5. FILE OPENING UX
====================================================

When user clicks a file:
- instantly open in editor
- immediately update preview
- preserve previous scroll position if reopened
- smooth file switching

Avoid:
- blank editor flashes
- loading states
- layout shifting

====================================================
6. LAYOUT POLISH
====================================================

Improve:
- panel spacing
- divider appearance
- visual hierarchy
- workspace readability

Requirements:
- subtle separators
- compact layout
- smooth resizing
- clean typography

Avoid:
- giant borders
- oversized spacing
- dashboard feeling

====================================================
7. PREVIEW PANEL POLISH
====================================================

Preview currently works well.

Now improve:
- reading width
- typography consistency
- scrolling smoothness
- fullscreen maximize experience

Preview should feel like:
- GitHub markdown
- Typora preview
- documentation reader

====================================================
8. FULLSCREEN PANEL EXPERIENCE
====================================================

Double-click behavior should feel polished.

Requirements:
- double-click editor → fullscreen editor
- double-click preview → fullscreen preview
- double-click again → restore split layout

Transitions should:
- feel instant
- preserve scroll positions
- preserve editor state

====================================================
9. PERFORMANCE VALIDATION
====================================================

After these UI changes:
- ensure typing remains smooth
- ensure preview remains non-blocking
- ensure sidebar resizing does not trigger rerender storms

Avoid:
- full app rerenders
- resize lag
- explorer lag
- markdown preview lag

====================================================
10. FINAL V1 GOAL
====================================================

The final V1 should feel like:

“A lightweight native Markdown workspace IDE.”

Core experience:
- choose workspace
- browse markdown/text files
- edit smoothly
- preview instantly
- focus on writing

NOT:
- general IDE
- bloated dashboard
- experimental editor

====================================================
IMPORTANT
====================================================

Prioritize:
1. workspace usability
2. typing smoothness
3. explorer clarity
4. preview readability
5. layout stability

DO NOT overengineer.
DO NOT add unnecessary features.

Finalize the workspace experience cleanly and professionally.