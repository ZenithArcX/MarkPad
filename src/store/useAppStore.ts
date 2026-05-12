import { create } from 'zustand';

export interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
}

export type ViewMode = 'split' | 'editor-max' | 'preview-max';

// App goes through a boot sequence before showing the main IDE
export type AppPhase = 'loading' | 'setup' | 'ready';

interface AppState {
  phase: AppPhase;
  workspacePath: string | null;
  recentWorkspaces: string[];
  fileTree: FileNode[];
  activeFilePath: string | null;
  rawMarkdown: string;
  isSaved: boolean;
  theme: 'light' | 'dark';
  viewMode: ViewMode;
  sidebarCollapsed: boolean;

  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  setViewMode: (mode: ViewMode) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Boot
  initSettings: () => Promise<void>;

  // Workspace
  openWorkspace: () => Promise<void>;
  openWorkspacePath: (workspacePath: string) => Promise<void>;
  createDefaultWorkspace: () => Promise<void>;
  refreshWorkspace: () => Promise<void>;

  // File actions
  loadFile: (filePath: string) => Promise<void>;
  updateMarkdown: (text: string) => void;
  saveActiveFile: () => Promise<void>;
  createFile: (dirPath: string, fileName: string) => Promise<void>;
  deletePath: (targetPath: string) => Promise<void>;
}

let autosaveTimer: any = null;

async function applyWorkspaceResult(
  result: { workspacePath: string; tree: any[] },
  set: (partial: Partial<AppState>) => void,
) {
  set({
    phase: 'ready',
    workspacePath: result.workspacePath,
    fileTree: result.tree,
    activeFilePath: null,
    rawMarkdown: '',
    isSaved: true,
  });
  // Persist
  await window.api.saveSettings({ workspacePath: result.workspacePath, activeFilePath: null });
  // Tell the main process to rebuild the menu with updated recents
  window.api.rebuildMenu();
  // Load recent workspaces list
  const recent = await window.api.getRecentWorkspaces();
  set({ recentWorkspaces: recent });
}

export const useAppStore = create<AppState>((set, getStore) => ({
  phase: 'loading',
  workspacePath: null,
  recentWorkspaces: [],
  fileTree: [],
  activeFilePath: null,
  rawMarkdown: '',
  isSaved: true,
  theme: 'light',
  viewMode: 'split',
  sidebarCollapsed: false,

  setTheme: (theme) => set({ theme }),
  setViewMode: (viewMode) => set({ viewMode }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

  initSettings: async () => {
    try {
      const settings = await window.api.getSettings();
      const recent = await window.api.getRecentWorkspaces();
      set({ recentWorkspaces: recent });

      if (settings?.workspacePath) {
        // Try to reopen last workspace
        const result = await window.api.openWorkspacePath(settings.workspacePath);
        if (result) {
          set({
            phase: 'ready',
            workspacePath: result.workspacePath,
            fileTree: result.tree,
            recentWorkspaces: recent,
          });
          // Reload last active file
          if (settings.activeFilePath) {
            try {
              await getStore().loadFile(settings.activeFilePath);
            } catch {
              // File may have been deleted — ignore
            }
          }
          return;
        }
      }

      // No valid workspace — show setup screen
      set({ phase: 'setup' });
    } catch (e) {
      console.error('initSettings failed', e);
      set({ phase: 'setup' });
    }
  },

  openWorkspace: async () => {
    const result = await window.api.openWorkspace();
    if (!result) return;
    await applyWorkspaceResult(result, set);
  },

  openWorkspacePath: async (workspacePath: string) => {
    const result = await window.api.openWorkspacePath(workspacePath);
    if (!result) return;
    await applyWorkspaceResult(result, set);
  },

  createDefaultWorkspace: async () => {
    const result = await window.api.createDefaultWorkspace();
    if (!result) return;
    await applyWorkspaceResult(result, set);
  },

  refreshWorkspace: async () => {
    const { workspacePath } = getStore();
    if (!workspacePath) return;
    try {
      const tree = await window.api.readDirectory(workspacePath);
      set({ fileTree: tree });
    } catch (e) {
      console.error('refreshWorkspace failed', e);
    }
  },

  loadFile: async (filePath: string) => {
    const { isSaved, saveActiveFile } = getStore();
    if (!isSaved) await saveActiveFile();
    try {
      const content = await window.api.readFilePath(filePath);
      set({ activeFilePath: filePath, rawMarkdown: content, isSaved: true });
      await window.api.saveSettings({
        activeFilePath: filePath,
        workspacePath: getStore().workspacePath,
      });
    } catch (e) {
      console.error('loadFile failed', e);
    }
  },

  updateMarkdown: (text: string) => {
    set({ rawMarkdown: text, isSaved: false });
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => getStore().saveActiveFile(), 1000);
  },

  saveActiveFile: async () => {
    const { activeFilePath, rawMarkdown, isSaved, workspacePath } = getStore();
    if (isSaved || !activeFilePath) return;
    try {
      await window.api.saveFile(rawMarkdown, activeFilePath, workspacePath ?? undefined);
      set({ isSaved: true });
    } catch (e) {
      console.error('saveActiveFile failed', e);
    }
  },

  createFile: async (dirPath: string, fileName: string) => {
    try {
      const newPath = await window.api.createFile(dirPath, fileName);
      await getStore().refreshWorkspace();
      await getStore().loadFile(newPath);
    } catch (e) {
      console.error('createFile failed', e);
    }
  },

  deletePath: async (targetPath: string) => {
    try {
      await window.api.deletePath(targetPath);
      if (getStore().activeFilePath === targetPath) {
        set({ activeFilePath: null, rawMarkdown: '', isSaved: true });
      }
      await getStore().refreshWorkspace();
    } catch (e) {
      console.error('deletePath failed', e);
    }
  },
}));
