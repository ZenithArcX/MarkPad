/// <reference types="vite/client" />

interface Window {
  api: {
    // File operations
    readFile: () => Promise<{ content: string; filePath: string } | null>;
    saveFile: (content: string, filePath?: string, workspacePath?: string) => Promise<string | null>;

    // Workspace FS API
    openWorkspace: () => Promise<{ workspacePath: string; tree: any[] } | null>;
    createDefaultWorkspace: () => Promise<{ workspacePath: string; tree: any[] } | null>;
    getRecentWorkspaces: () => Promise<string[]>;
    openWorkspacePath: (workspacePath: string) => Promise<{ workspacePath: string; tree: any[] } | null>;
    readDirectory: (dirPath: string) => Promise<any[]>;
    readFilePath: (filePath: string) => Promise<string>;
    createFile: (dirPath: string, fileName: string) => Promise<string>;
    createDirectory: (dirPath: string, dirName: string) => Promise<string>;
    deletePath: (targetPath: string) => Promise<boolean>;
    renamePath: (oldPath: string, newName: string) => Promise<string>;

    // Events
    onFileOpened: (callback: (content: string, filePath: string) => void) => void;
    onMenuAction: (callback: (action: string) => void) => void;
    rebuildMenu: () => void;

    // Settings
    getSettings: () => Promise<any>;
    saveSettings: (settings: any) => Promise<void>;
  };
}
