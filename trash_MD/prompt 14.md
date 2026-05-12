We are now preparing the FIRST SHIPPABLE RELEASE of the application.

The application is:
- a cross-platform Markdown Workspace IDE
- built with Electron + React + TypeScript + Vite

We are FINALIZING:
- Windows installer build pipeline
- production packaging
- executable generation
- release-ready distribution

====================================================
PRIMARY GOAL
====================================================

Generate a PROFESSIONAL Windows installer experience similar to:
- Notepad++
- Obsidian
- VSCode
- Typora

The user should:
- download installer
- install normally
- launch from desktop/start menu
- use like a native Windows application

====================================================
WINDOWS BUILD REQUIREMENTS
====================================================

Generate:
- production Electron build
- Windows .exe installer
- desktop shortcuts
- Start Menu integration
- proper app icon
- installer branding

Preferred:
- NSIS installer
- Electron Builder

====================================================
INSTALLER EXPERIENCE
====================================================

The installer should support:
- installation directory selection
- desktop shortcut option
- Start Menu shortcut
- uninstall support
- app versioning
- auto-generated install wizard

The experience should feel:
- native
- professional
- polished

====================================================
WORKSPACE DIRECTORY DURING INSTALL
====================================================

IMPORTANT:

During first app launch OR installation setup:
prompt user to:
- choose default Markdown workspace directory
OR
- create default workspace automatically

Example:
Documents/MarkPad

This becomes:
- default workspace
- default save location
- autosave/cache root

====================================================
APP METADATA
====================================================

Configure:
- application name
- application icon
- version
- executable name
- publisher metadata

Example:
App Name:
MarkPad

Executable:
MarkPad.exe

====================================================
WINDOWS NATIVE FEATURES
====================================================

Ensure:
- proper window icon
- native titlebar support
- file associations optional
- proper taskbar icon
- proper DPI scaling

====================================================
BUILD PIPELINE
====================================================

Generate:
- Electron Builder configuration
- package.json scripts
- production build scripts
- output directories

Example commands:
----------------------------------------------------
npm run build
npm run dist
----------------------------------------------------

====================================================
OUTPUT REQUIREMENTS
====================================================

Generate:
- .exe installer
- portable build optional
- unpacked build optional

Example:
dist/
 ├── MarkPad Setup.exe
 ├── win-unpacked/
 └── latest.yml

====================================================
GITHUB RELEASE PREPARATION
====================================================

Prepare project for GitHub release.

Generate:
- release-ready README
- installation instructions
- build instructions
- screenshots section
- release notes template

====================================================
PRODUCTION OPTIMIZATION
====================================================

Ensure:
- production mode enabled
- source maps configured properly
- dev tools disabled in production
- optimized bundle size
- Electron security best practices

====================================================
WINDOWS SECURITY / POLISH
====================================================

Configure:
- Content Security Policy
- secure Electron preload usage
- contextIsolation
- nodeIntegration safety

====================================================
FUTURE CROSS-PLATFORM SUPPORT
====================================================

Prepare architecture for later:
- macOS .dmg builds
- Linux .deb builds
- Linux AppImage builds

BUT:
focus ONLY on Windows release for now.

====================================================
FINAL GOAL
====================================================

The final result should feel like:
- a real native Windows application
- professionally installable software
- polished Markdown IDE

The user experience should feel:
- smooth
- trustworthy
- lightweight
- production-ready

====================================================
IMPORTANT
====================================================

DO NOT focus on adding features now.

Focus ONLY on:
- build pipeline
- installer generation
- release packaging
- production polish
- executable creation

We are SHIPPING V1.