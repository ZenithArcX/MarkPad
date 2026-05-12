import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { githubLight } from '@uiw/codemirror-theme-github';
import { useAppStore } from '../store/useAppStore';

export const EditorPanel: React.FC = () => {
  const {
    rawMarkdown, updateMarkdown, activeFilePath, isSaved,
    viewMode, setViewMode, sidebarCollapsed, setSidebarCollapsed
  } = useAppStore();

  const handleChange = useCallback((value: string) => {
    updateMarkdown(value);
  }, [updateMarkdown]);

  const handleDoubleClick = () => {
    setViewMode(viewMode === 'editor-max' ? 'split' : 'editor-max');
  };

  const fileName = activeFilePath?.split(/[\\/]/).pop();
  const isMaximized = viewMode === 'editor-max';

  return (
    <div className="flex-1 h-full flex flex-col bg-white min-w-0">
      {/* Tab bar / header */}
      <div
        className="h-9 border-b border-slate-200 flex items-center justify-between px-3 bg-[#f8f9fa] shrink-0 select-none cursor-default hover:bg-slate-100 transition-colors"
        onDoubleClick={handleDoubleClick}
        title="Double-click to toggle fullscreen editor"
      >
        <div className="flex items-center gap-2 min-w-0">
          {/* Sidebar toggle — only in split mode */}
          {viewMode === 'split' && (
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarCollapsed(!sidebarCollapsed);
              }}
              className="text-slate-400 hover:text-slate-700 transition-colors text-xs px-1.5 py-0.5 rounded hover:bg-slate-200 shrink-0 leading-none"
              title={sidebarCollapsed ? 'Show Explorer' : 'Hide Explorer'}
            >
              {sidebarCollapsed ? '▶ |||' : '||| ◀'}
            </button>
          )}

          {activeFilePath ? (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[13px] text-slate-600 shrink-0">📄</span>
              <span className="text-[13px] font-medium text-slate-700 truncate">{fileName}</span>
              {!isSaved && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" title="Unsaved changes" />
              )}
            </div>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Editor</span>
          )}
        </div>

        {activeFilePath && (
          <button
            onClick={(e) => { e.stopPropagation(); handleDoubleClick(); }}
            className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors px-2 py-0.5 rounded hover:bg-slate-200 shrink-0"
          >
            {isMaximized ? '⊠ Restore' : '⊡ Expand'}
          </button>
        )}
      </div>

      {/* Editor body */}
      <div className="flex-1 overflow-hidden bg-white">
        {!activeFilePath ? (
          <div className="flex items-center justify-center h-full text-slate-300 text-sm select-none flex-col gap-3">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>Select a file to start editing</p>
          </div>
        ) : (
          <CodeMirror
            value={rawMarkdown}
            height="100%"
            extensions={[
              markdown({ base: markdownLanguage, codeLanguages: languages }),
            ]}
            theme={githubLight}
            onChange={handleChange}
            className="h-full text-[14px]"
            basicSetup={{
              lineNumbers: false,
              highlightActiveLineGutter: false,
              highlightActiveLine: false,
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: true,
              indentOnInput: false,
            }}
            style={{
              height: '100%',
              paddingTop: '16px',
              paddingBottom: '16px',
            }}
          />
        )}
      </div>
    </div>
  );
};
