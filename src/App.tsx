import { useEffect, useRef, useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { WorkspaceSetup } from './components/WorkspaceSetup';
import { useAppStore } from './store/useAppStore';

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 420;
const DEFAULT_SIDEBAR_WIDTH = 260;

function App() {
  const { loadFile, initSettings, viewMode, sidebarCollapsed, phase } = useAppStore();

  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebarWidth');
      const w = saved ? parseInt(saved, 10) : DEFAULT_SIDEBAR_WIDTH;
      return Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, w));
    } catch {
      return DEFAULT_SIDEBAR_WIDTH;
    }
  });

  const [editorRatio, setEditorRatio] = useState(() => {
    try {
      const saved = localStorage.getItem('editorRatio');
      return saved ? parseFloat(saved) : 0.5;
    } catch {
      return 0.5;
    }
  });

  const isDraggingSidebar = useRef(false);
  const isDraggingCenter = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);
  const dragStartRatio = useRef(0);

  useEffect(() => {
    initSettings();

    if (window.api?.onFileOpened) {
      window.api.onFileOpened((_content: string, filePath: string) => {
        loadFile(filePath);
      });
    } else {
      console.error("window.api is undefined! Preload script failed to load or expose contextBridge.");
    }

    // Wire Electron native menu actions (Ctrl+1, Ctrl+2, Ctrl+S, etc.)
    if (window.api?.onMenuAction) {
      window.api.onMenuAction((action: string) => {
        const store = useAppStore.getState();
        if (action.startsWith('open-workspace-path:')) {
          const p = action.slice('open-workspace-path:'.length);
          store.openWorkspacePath(p).then(() => window.api.rebuildMenu());
          return;
        }
        switch (action) {
          case 'view-editor':       store.setViewMode('editor-max'); break;
          case 'view-preview':      store.setViewMode('preview-max'); break;
          case 'toggle-split-view': store.setViewMode('split'); break;
          case 'save-file':         store.saveActiveFile(); break;
        }
      });
    }
  }, [initSettings, loadFile]);

  // Escape → restore split view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && useAppStore.getState().viewMode !== 'split') {
        useAppStore.getState().setViewMode('split');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── Sidebar drag ──────────────────────────────────────────────────────────
  const onSidebarDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingSidebar.current = true;
    dragStartX.current = e.clientX;
    dragStartWidth.current = sidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [sidebarWidth]);

  // ── Center drag ───────────────────────────────────────────────────────────
  const onCenterDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingCenter.current = true;
    dragStartX.current = e.clientX;
    dragStartRatio.current = editorRatio;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [editorRatio]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingSidebar.current) {
        const delta = e.clientX - dragStartX.current;
        const newW = Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, dragStartWidth.current + delta));
        setSidebarWidth(newW);
      }
      if (isDraggingCenter.current) {
        const totalW = window.innerWidth - (sidebarCollapsed ? 0 : sidebarWidth);
        const delta = e.clientX - dragStartX.current;
        const deltaRatio = delta / totalW;
        const newRatio = Math.min(0.85, Math.max(0.15, dragStartRatio.current + deltaRatio));
        setEditorRatio(newRatio);
      }
    };

    const onMouseUp = () => {
      if (isDraggingSidebar.current) {
        localStorage.setItem('sidebarWidth', String(sidebarWidth));
        isDraggingSidebar.current = false;
      }
      if (isDraggingCenter.current) {
        localStorage.setItem('editorRatio', String(editorRatio));
        isDraggingCenter.current = false;
      }
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [sidebarWidth, editorRatio, sidebarCollapsed]);

  // ── Phase gate ───────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <div className="h-screen w-screen bg-[#1e1e2e] flex items-center justify-center">
        <div className="text-slate-400 text-sm animate-pulse">Loading workspace…</div>
      </div>
    );
  }

  if (phase === 'setup') {
    return <WorkspaceSetup />;
  }

  // ── IDE Layout ───────────────────────────────────────────────────────────
  const showSidebar = viewMode === 'split' && !sidebarCollapsed;
  const showEditor  = viewMode === 'split' || viewMode === 'editor-max';
  const showPreview = viewMode === 'split' || viewMode === 'preview-max';

  const remainingForCenterPanels = `calc(100vw - ${showSidebar ? sidebarWidth : 0}px)`;
  const editorFlexBasis   = viewMode === 'editor-max'  ? '100%'
                          : viewMode === 'preview-max' ? '0%'
                          : `calc(${remainingForCenterPanels} * ${editorRatio})`;
  const previewFlexBasis  = viewMode === 'preview-max' ? '100%'
                          : viewMode === 'editor-max'  ? '0%'
                          : `calc(${remainingForCenterPanels} * ${1 - editorRatio})`;

  return (
    <div
      className="h-screen w-screen overflow-hidden text-slate-800 flex"
      style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}
    >
      {/* Sidebar */}
      {showSidebar && (
        <div
          className="h-full flex-none flex flex-col bg-[#f3f4f6] border-r border-slate-200 overflow-hidden"
          style={{ width: sidebarWidth }}
        >
          <Sidebar />
        </div>
      )}

      {/* Sidebar drag handle */}
      {showSidebar && viewMode === 'split' && (
        <div
          className="w-1 h-full flex-none bg-slate-200 hover:bg-blue-400 cursor-col-resize transition-colors z-20"
          onMouseDown={onSidebarDragStart}
        />
      )}

      {/* Editor */}
      {showEditor && (
        <div
          className="h-full flex flex-col overflow-hidden"
          style={{
            flexBasis: editorFlexBasis,
            flexGrow: viewMode === 'editor-max' ? 1 : 0,
            flexShrink: 0,
            minWidth: viewMode === 'editor-max' ? 0 : 200,
          }}
        >
          <EditorPanel />
        </div>
      )}

      {/* Center drag handle */}
      {viewMode === 'split' && (
        <div
          className="w-1 h-full flex-none bg-slate-200 hover:bg-blue-400 cursor-col-resize transition-colors z-20"
          onMouseDown={onCenterDragStart}
        />
      )}

      {/* Preview */}
      {showPreview && (
        <div
          className="h-full flex flex-col overflow-hidden"
          style={{
            flexBasis: previewFlexBasis,
            flexGrow: viewMode === 'preview-max' ? 1 : 0,
            flexShrink: 0,
            minWidth: viewMode === 'preview-max' ? 0 : 200,
          }}
        >
          <PreviewPanel />
        </div>
      )}
    </div>
  );
}

export default App;
