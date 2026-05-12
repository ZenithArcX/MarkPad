import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import Store from 'electron-store';
import { setupIpcHandlers } from './ipcHandlers';
import { buildMenu } from './menu';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = app.isPackaged;

if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', '1');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

const store = new Store();
if (store.has('layoutSizes')) store.delete('layoutSizes');

let mainWindow: BrowserWindow | null = null;
const menuRef: { mainWindow: BrowserWindow | null } = { mainWindow: null };
const iconCandidate = path.join(__dirname, '..', 'build', 'icon.ico');
const iconPath: string | undefined = existsSync(iconCandidate) ? iconCandidate : undefined;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280, height: 800, minWidth: 680, minHeight: 480,
    title: 'MarkPad',
    ...(iconPath ? { icon: iconPath } : {}),
    backgroundColor: '#ffffff',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true,
      devTools: !isProd,
    },
  });

  menuRef.mainWindow = mainWindow;
  buildMenu(menuRef, store);

  if (!isProd && process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => { mainWindow?.show(); mainWindow?.focus(); });
  
  mainWindow.on('closed', () => { mainWindow = null; menuRef.mainWindow = null; });
}

app.whenReady().then(() => {
  setupIpcHandlers(store);
  ipcMain.on('rebuild-menu', () => buildMenu(menuRef, store));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
