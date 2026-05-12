The packaged Windows .exe build is BROKEN in production mode.

IMPORTANT:
The development version works correctly.

BUT after packaging/installing the .exe:
- editor does not load properly
- preview does not render
- files cannot be created
- files cannot be edited
- workspace functionality breaks

This means the application has PRODUCTION BUILD / PACKAGING issues.

STOP all feature work.

We are now in:
PRODUCTION DEBUGGING MODE.

====================================================
CRITICAL REQUIREMENT
====================================================

Investigate ALL differences between:
- development environment
AND
- packaged Electron production environment

The packaged application must behave IDENTICALLY to the dev version.

====================================================
POSSIBLE ROOT CAUSES TO INVESTIGATE
====================================================

Investigate ALL of these carefully:

- broken preload paths
- incorrect Electron BrowserWindow paths
- Vite asset resolution failure
- renderer loading issues
- app.asar filesystem restrictions
- relative path failures
- IPC bridge failures
- preload not bundled correctly
- Electron security restrictions
- file permission problems
- production routing issues
- Electron Builder config issues
- broken static asset references
- IndexedDB persistence path failures
- workspace path failures
- missing dist assets
- packaged filesystem access problems

====================================================
1. ELECTRON MAIN PROCESS AUDIT
====================================================

Verify:
- production BrowserWindow loading
- correct file:// loading
- preload script resolution
- app.isPackaged handling
- production path handling

Ensure:
- renderer loads correctly in packaged app
- preload loads correctly in packaged app

====================================================
2. PRELOAD + IPC VALIDATION
====================================================

Audit:
- preload bundling
- contextBridge exposure
- IPC communication
- Electron security configuration

Ensure:
- renderer can access filesystem APIs
- workspace APIs work in packaged builds
- save/open APIs function properly

====================================================
3. FILESYSTEM ACCESS FIX
====================================================

Investigate:
- packaged filesystem permissions
- workspace directory access
- save file failures
- create file failures

Ensure:
- app can create markdown files
- app can edit markdown files
- app can persist workspace data

====================================================
4. PRODUCTION PATH FIXES
====================================================

Fix ALL path issues involving:
- __dirname
- process.cwd()
- app.getPath()
- renderer asset loading
- preload resolution

Packaged Electron paths differ from development paths.

Handle BOTH correctly.

====================================================
5. APP.ASAR COMPATIBILITY
====================================================

Investigate:
- Electron Builder asar packaging
- files inaccessible inside asar
- write restrictions

If needed:
- configure unpacking
- exclude writable directories
- move persistence outside app.asar

====================================================
6. PRODUCTION LOGGING SYSTEM
====================================================

Add production logging immediately.

Requirements:
- production console logging
- filesystem error logging
- preload load logging
- renderer startup logging
- IPC error logging

Create:
- debug log file
OR
- Electron log system

We need REAL production diagnostics.

====================================================
7. RENDERER LOAD VALIDATION
====================================================

Verify:
- editor component mounts
- preview component mounts
- state initializes
- workspace loads
- file explorer loads

Detect:
- silent crashes
- React mount failures
- missing assets
- preload failures

====================================================
8. ELECTRON BUILDER CONFIG AUDIT
====================================================

Audit:
- electron-builder config
- extraResources
- preload inclusion
- dist inclusion
- build output structure

Ensure:
- ALL required files packaged correctly

====================================================
9. WINDOWS INSTALLER VALIDATION
====================================================

Ensure installed application:
- works after reboot
- remembers workspace
- saves files correctly
- opens files correctly
- launches normally from Start Menu/Desktop

====================================================
10. REQUIRED OUTPUT
====================================================

Provide:
1. Exact root cause analysis
2. Production vs development differences
3. Broken production paths
4. Broken preload/IPC behavior
5. Filesystem permission issues
6. Electron Builder fixes
7. Correct production architecture
8. Exact code-level fixes

====================================================
IMPORTANT
====================================================

DO NOT add features.
DO NOT redesign UI.

Focus ONLY on:
- packaged build stability
- production correctness
- Electron packaging reliability
- filesystem functionality
- renderer/preload correctness

We are debugging a REAL desktop application now.