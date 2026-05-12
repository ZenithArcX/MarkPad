import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useAppStore } from '../store/useAppStore';

export const PreviewPanel: React.FC = () => {
  const { rawMarkdown, activeFilePath, viewMode, setViewMode } = useAppStore();
  const [debouncedMarkdown, setDebouncedMarkdown] = useState(rawMarkdown);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedMarkdown(rawMarkdown), 300);
    return () => clearTimeout(timer);
  }, [rawMarkdown]);

  const handleDoubleClick = () => {
    setViewMode(viewMode === 'preview-max' ? 'split' : 'preview-max');
  };

  const isMaximized = viewMode === 'preview-max';

  // Adaptive layout: in split mode, center at a comfortable reading width.
  // In fullscreen, expand to use the full screen with generous but not extreme width.
  const contentClass = isMaximized
    ? 'w-full max-w-[1200px] mx-auto px-16 py-10'
    : 'w-full max-w-3xl mx-auto px-8 py-10';

  return (
    <div className="flex-1 h-full flex flex-col bg-white min-w-0 relative">
      {/* Header */}
      <div
        className="h-9 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-[#f8f9fa] select-none cursor-default hover:bg-slate-100 transition-colors"
        onDoubleClick={handleDoubleClick}
        title="Double-click to toggle fullscreen preview"
      >
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Preview</span>
        {activeFilePath && (
          <button
            onClick={handleDoubleClick}
            className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors px-2 py-0.5 rounded hover:bg-slate-200 flex items-center gap-1"
          >
            {isMaximized ? '⊠ Restore (Esc)' : '⊡ Fullscreen'}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {!activeFilePath ? (
          <div className="flex items-center justify-center h-full text-slate-300 text-sm select-none">
            Open a file to preview
          </div>
        ) : (
          <div className={contentClass}>
            <div className="prose prose-slate prose-sm md:prose-base max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {debouncedMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
