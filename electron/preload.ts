const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // File operations
  readFile: () => ipcRenderer.invoke('read-file'),
  saveFile: (content: string, filePath?: string, workspacePath?: string) =>
    ipcRenderer.invoke('save-file', content, filePath, workspacePath),

  // Workspace FS API
  openWorkspace: () => ipcRenderer.invoke('open-workspace'),
  createDefaultWorkspace: () => ipcRenderer.invoke('create-default-workspace'),
  getRecentWorkspaces: () => ipcRenderer.invoke('get-recent-workspaces'),
  openWorkspacePath: (workspacePath: string) => ipcRenderer.invoke('open-workspace-path', workspacePath),
  readDirectory: (dirPath: string) => ipcRenderer.invoke('read-directory', dirPath),
  readFilePath: (filePath: string) => ipcRenderer.invoke('read-file-path', filePath),
  createFile: (dirPath: string, fileName: string) => ipcRenderer.invoke('create-file', dirPath, fileName),
  createDirectory: (dirPath: string, dirName: string) => ipcRenderer.invoke('create-directory', dirPath, dirName),
  deletePath: (targetPath: string) => ipcRenderer.invoke('delete-path', targetPath),
  renamePath: (oldPath: string, newName: string) => ipcRenderer.invoke('rename-path', oldPath, newName),

  // Events
  onFileOpened: (callback: (content: string, filePath: string) => void) => {
    ipcRenderer.on('file-opened', (_event: any, content: string, filePath: string) => callback(content, filePath));
  },
  onMenuAction: (callback: (action: string) => void) => {
    ipcRenderer.on('menu-action', (_event: any, action: string) => callback(action));
  },
  rebuildMenu: () => ipcRenderer.send('rebuild-menu'),

  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings: any) => ipcRenderer.invoke('save-settings', settings),
});
