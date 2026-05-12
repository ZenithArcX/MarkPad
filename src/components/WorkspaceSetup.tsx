import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export const WorkspaceSetup: React.FC = () => {
  const { openWorkspace, createDefaultWorkspace, openWorkspacePath, recentWorkspaces } = useAppStore();
  const [isCreating, setIsCreating] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleCreateDefault = async () => {
    setIsCreating(true);
    await createDefaultWorkspace();
    setIsCreating(false);
  };

  const handleChooseFolder = async () => {
    setIsOpening(true);
    await openWorkspace();
    setIsOpening(false);
  };

  const handleOpenRecent = async (p: string) => {
    await openWorkspacePath(p);
  };

  // Shorten path for display
  const shortPath = (p: string) => {
    const parts = p.replace(/\\/g, '/').split('/');
    return parts.length > 3 ? '…/' + parts.slice(-2).join('/') : p.replace(/\\/g, '/');
  };

  return (
    <div className="h-screen w-screen bg-[#1e1e2e] flex items-center justify-center text-white select-none">
      <div className="w-full max-w-lg px-6">
        {/* Logo / title */}
        <div className="mb-10 text-center">
          <div className="text-4xl mb-3">📝</div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to MarkPad</h1>
          <p className="text-sm text-slate-400 mt-2">Choose a workspace to get started</p>
        </div>

        {/* Primary actions */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleCreateDefault}
            disabled={isCreating}
            className="w-full flex items-center gap-3 px-5 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-xl transition-colors text-left"
          >
            <span className="text-2xl shrink-0">✨</span>
            <div>
              <div className="font-medium text-sm">Create Default Workspace</div>
              <div className="text-xs text-blue-200 mt-0.5">
                {isCreating ? 'Creating…' : 'Creates Documents/MarkPad with starter notes'}
              </div>
            </div>
          </button>

          <button
            onClick={handleChooseFolder}
            disabled={isOpening}
            className="w-full flex items-center gap-3 px-5 py-4 bg-white/10 hover:bg-white/15 disabled:opacity-60 rounded-xl transition-colors text-left"
          >
            <span className="text-2xl shrink-0">📂</span>
            <div>
              <div className="font-medium text-sm">Open Existing Folder</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {isOpening ? 'Opening…' : 'Browse to an existing markdown directory'}
              </div>
            </div>
          </button>
        </div>

        {/* Recent workspaces */}
        {recentWorkspaces.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Recent</p>
            <div className="space-y-1">
              {recentWorkspaces.slice(0, 5).map((p) => (
                <button
                  key={p}
                  onClick={() => handleOpenRecent(p)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-left group"
                >
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors shrink-0">🗂</span>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                    {shortPath(p)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
