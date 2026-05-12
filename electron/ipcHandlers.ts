import { ipcMain, dialog, BrowserWindow, app } from 'electron';
import fs from 'fs/promises';
import path from 'path';
import Store from 'electron-store';

export interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
}

// Folders always skipped when building the file tree
const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.vite', '.cache', '.markpad']);

// Files/extensions allowed in the explorer
function isMarkdownFile(name: string): boolean {
  return name.endsWith('.md') || name.endsWith('.markdown') || name.endsWith('.txt');
}

async function buildFileTree(dirPath: string): Promise<FileNode[]> {
  let entries;
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const nodes: FileNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.') || IGNORED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const children = await buildFileTree(fullPath);
      // Only include directories that contain at least one markdown file (recursively)
      if (children.length > 0) {
        nodes.push({ name: entry.name, path: fullPath, isDirectory: true, children });
      }
    } else if (isMarkdownFile(entry.name)) {
      nodes.push({ name: entry.name, path: fullPath, isDirectory: false });
    }
  }

  // Sort: directories first, then alphabetically
  return nodes.sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1;
    if (!a.isDirectory && b.isDirectory) return 1;
    return a.name.localeCompare(b.name);
  });
}

/** Ensure .markpad config dir exists inside workspace */
async function ensureWorkspaceMeta(workspacePath: string) {
  const metaDir = path.join(workspacePath, '.markpad');
  try {
    await fs.mkdir(metaDir, { recursive: true });
  } catch { /* already exists */ }
}

/** Add to recent workspaces list (max 10), deduplicating */
function pushRecentWorkspace(store: Store, workspacePath: string) {
  const existing: string[] = (store.get('recentWorkspaces') as string[]) || [];
  const deduped = [workspacePath, ...existing.filter(p => p !== workspacePath)].slice(0, 10);
  store.set('recentWorkspaces', deduped);
}

export function setupIpcHandlers(store: Store) {

  // ── File read ────────────────────────────────────────────────────────────
  ipcMain.handle('read-file-path', async (_, filePath: string) => {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  });

  // ── Open workspace (picker dialog) ───────────────────────────────────────
  ipcMain.handle('open-workspace', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return null;

    const { canceled, filePaths } = await dialog.showOpenDialog(window, {
      properties: ['openDirectory'],
      title: 'Choose Workspace Folder',
    });

    if (canceled || filePaths.length === 0) return null;

    const workspacePath = filePaths[0];
    await ensureWorkspaceMeta(workspacePath);
    pushRecentWorkspace(store, workspacePath);

    const tree = await buildFileTree(workspacePath);
    return { workspacePath, tree };
  });

  // ── Create default workspace in Documents/MarkPad ────────────────────────
  ipcMain.handle('create-default-workspace', async () => {
    const docsPath = app.getPath('documents');
    const workspacePath = path.join(docsPath, 'MarkPad');
    await fs.mkdir(workspacePath, { recursive: true });
    await fs.mkdir(path.join(workspacePath, 'Notes'), { recursive: true });
    await fs.mkdir(path.join(workspacePath, 'Drafts'), { recursive: true });

    // Seed a welcome file
    const welcomePath = path.join(workspacePath, 'Notes', 'Welcome.md');
    try {
      await fs.access(welcomePath);
    } catch {
      await fs.writeFile(welcomePath, [
        '# Welcome to MarkPad',
        '',
        'This is your primary markdown workspace.',
        '',
        '## Getting Started',
        '',
        '- Create new files with the **+ File** button in the sidebar',
        '- Switch workspaces anytime with **Open Folder**',
        '- Use `Ctrl+1` / `Ctrl+2` to toggle editor / preview fullscreen',
        '',
        '> Your files auto-save as you type.',
      ].join('\n'), 'utf-8');
    }

    await ensureWorkspaceMeta(workspacePath);
    pushRecentWorkspace(store, workspacePath);

    const tree = await buildFileTree(workspacePath);
    return { workspacePath, tree };
  });

  // ── Get recent workspaces ─────────────────────────────────────────────────
  ipcMain.handle('get-recent-workspaces', () => {
    return (store.get('recentWorkspaces') as string[]) || [];
  });

  // ── Open a specific recent workspace by path ──────────────────────────────
  ipcMain.handle('open-workspace-path', async (_, workspacePath: string) => {
    try {
      await fs.access(workspacePath);
    } catch {
      // Path no longer exists — remove from recents
      const existing: string[] = (store.get('recentWorkspaces') as string[]) || [];
      store.set('recentWorkspaces', existing.filter(p => p !== workspacePath));
      return null;
    }
    await ensureWorkspaceMeta(workspacePath);
    pushRecentWorkspace(store, workspacePath);
    const tree = await buildFileTree(workspacePath);
    return { workspacePath, tree };
  });

  // ── Read directory ────────────────────────────────────────────────────────
  ipcMain.handle('read-directory', async (_, dirPath: string) => {
    return await buildFileTree(dirPath);
  });

  // ── Create file (default dir = workspace if not specified) ───────────────
  ipcMain.handle('create-file', async (_, dirPath: string, fileName: string) => {
    const filePath = path.join(dirPath, fileName);
    await fs.writeFile(filePath, '', 'utf-8');
    return filePath;
  });

  // ── Create directory ──────────────────────────────────────────────────────
  ipcMain.handle('create-directory', async (_, dirPath: string, dirName: string) => {
    const newDirPath = path.join(dirPath, dirName);
    await fs.mkdir(newDirPath, { recursive: true });
    return newDirPath;
  });

  // ── Delete ────────────────────────────────────────────────────────────────
  ipcMain.handle('delete-path', async (_, targetPath: string) => {
    const stat = await fs.stat(targetPath);
    if (stat.isDirectory()) {
      await fs.rm(targetPath, { recursive: true, force: true });
    } else {
      await fs.unlink(targetPath);
    }
    return true;
  });

  // ── Rename ────────────────────────────────────────────────────────────────
  ipcMain.handle('rename-path', async (_, oldPath: string, newName: string) => {
    const dir = path.dirname(oldPath);
    const newPath = path.join(dir, newName);
    await fs.rename(oldPath, newPath);
    return newPath;
  });

  // ── Save file (defaults to workspace dir) ────────────────────────────────
  ipcMain.handle('save-file', async (event, content: string, currentFilePath?: string, workspacePath?: string) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return null;

    let filePath = currentFilePath;

    if (!filePath) {
      const { canceled, filePath: newFilePath } = await dialog.showSaveDialog(window, {
        defaultPath: workspacePath
          ? path.join(workspacePath, 'Untitled.md')
          : undefined,
        filters: [
          { name: 'Markdown', extensions: ['md', 'markdown'] },
          { name: 'Text', extensions: ['txt'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (canceled || !newFilePath) return null;
      filePath = newFilePath;
    }

    await fs.writeFile(filePath, content, 'utf-8');
    return filePath;
  });

  // ── Legacy open-file picker (native menu) ────────────────────────────────
  ipcMain.handle('read-file', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return null;

    const { canceled, filePaths } = await dialog.showOpenDialog(window, {
      properties: ['openFile'],
      filters: [
        { name: 'Markdown', extensions: ['md', 'markdown', 'txt'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (canceled || filePaths.length === 0) return null;

    const filePath = filePaths[0];
    const content = await fs.readFile(filePath, 'utf-8');
    return { content, filePath };
  });

  // ── Settings ──────────────────────────────────────────────────────────────
  ipcMain.handle('get-settings', () => {
    return store.store;
  });

  ipcMain.handle('save-settings', (_, settings: any) => {
    Object.entries(settings).forEach(([k, v]) => store.set(k, v));
  });
}
