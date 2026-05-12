import { Menu, BrowserWindow, dialog } from 'electron';
import Store from 'electron-store';

type MenuRef = { mainWindow: BrowserWindow | null };

// Call this to rebuild and apply the native menu (needed after workspace changes)
export function buildMenu(ref: MenuRef, store: Store) {
  const win = ref.mainWindow;
  if (!win) return;

  const recentWorkspaces: string[] = (store.get('recentWorkspaces') as string[]) || [];
  const activeWorkspace: string | null = (store.get('workspacePath') as string) || null;

  // Helper: shorten long paths for display
  function shortPath(p: string): string {
    const parts = p.replace(/\\/g, '/').split('/');
    return parts.length > 4 ? '…/' + parts.slice(-2).join('/') : p.replace(/\\/g, '/');
  }

  // Build "Open >" submenu items
  const openSubmenu: Electron.MenuItemConstructorOptions[] = [];

  // ── Active/default workspace ─────────────────────────────────────────────
  if (activeWorkspace) {
    openSubmenu.push({
      label: `📂  ${shortPath(activeWorkspace)}`,
      toolTip: activeWorkspace,
      click: () => win.webContents.send('menu-action', `open-workspace-path:${activeWorkspace}`),
    });
    openSubmenu.push({ type: 'separator' });
  }

  // ── Recent workspaces (excluding active) ──────────────────────────────────
  const otherRecents = recentWorkspaces.filter(p => p !== activeWorkspace).slice(0, 8);

  if (otherRecents.length > 0) {
    otherRecents.forEach((p, i) => {
      openSubmenu.push({
        label: `${i + 1}. ${shortPath(p)}`,
        toolTip: p,
        click: () => win.webContents.send('menu-action', `open-workspace-path:${p}`),
      });
    });
    openSubmenu.push({ type: 'separator' });
  }

  // ── Browse… ───────────────────────────────────────────────────────────────
  openSubmenu.push({
    label: 'Browse for Folder…',
    accelerator: 'CmdOrCtrl+Shift+O',
    click: async () => {
      const { canceled, filePaths } = await dialog.showOpenDialog(win, {
        properties: ['openDirectory'],
        title: 'Choose Workspace Folder',
      });
      if (!canceled && filePaths.length > 0) {
        win.webContents.send('menu-action', `open-workspace-path:${filePaths[0]}`);
      }
    },
  });

  // ── Full template ─────────────────────────────────────────────────────────
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'CmdOrCtrl+N',
          click: () => win.webContents.send('menu-action', 'new-file'),
        },
        { type: 'separator' },
        {
          label: 'Open',
          submenu: openSubmenu,
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => win.webContents.send('menu-action', 'save-file'),
        },
        {
          label: 'Save As…',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => win.webContents.send('menu-action', 'save-as'),
        },
        { type: 'separator' },
        { role: 'quit', label: 'Exit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Editor Only',
          accelerator: 'CmdOrCtrl+1',
          click: () => win.webContents.send('menu-action', 'view-editor'),
        },
        {
          label: 'Preview Only',
          accelerator: 'CmdOrCtrl+2',
          click: () => win.webContents.send('menu-action', 'view-preview'),
        },
        {
          label: 'Split View',
          accelerator: 'CmdOrCtrl+L',
          click: () => win.webContents.send('menu-action', 'toggle-split-view'),
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About MarkPad',
          click: () => {
            dialog.showMessageBox(win, {
              type: 'info',
              title: 'About MarkPad',
              message: 'MarkPad — v1.0.0\nA fast, minimal Markdown workspace IDE.',
              buttons: ['OK'],
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Kept for backward-compat — called once at startup
export function createMenu(mainWindow: BrowserWindow, store?: Store) {
  buildMenu({ mainWindow }, store ?? new Store());
}
