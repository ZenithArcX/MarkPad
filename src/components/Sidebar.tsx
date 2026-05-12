import React, { useState } from 'react';
import { useAppStore, FileNode } from '../store/useAppStore';

const FileTreeNode: React.FC<{ node: FileNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { loadFile, activeFilePath, deletePath, createFile } = useAppStore();

  const isSelected = activeFilePath === node.path;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.isDirectory) {
      setIsOpen(!isOpen);
    } else {
      loadFile(node.path);
    }
  };

  const handleCreateFile = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const name = prompt('Enter new file name (e.g. note.md):');
    if (name) {
      await createFile(node.path, name.endsWith('.md') ? name : `${name}.md`);
      setIsOpen(true);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete ${node.name}?`)) {
      await deletePath(node.path);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center justify-between py-1 px-2 cursor-pointer select-none text-sm transition-colors group
          ${isSelected ? 'bg-slate-200 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center truncate">
          <span className="mr-1.5 w-4 text-center opacity-70 shrink-0">
            {node.isDirectory ? (isOpen ? '▾' : '▸') : '📄'}
          </span>
          <span className="truncate">{node.name}</span>
        </div>
        
        {isHovered && (
          <div className="flex items-center space-x-1 shrink-0 bg-inherit pl-2">
            {node.isDirectory && (
              <button 
                onClick={handleCreateFile}
                className="text-slate-400 hover:text-blue-600 p-0.5 rounded hover:bg-slate-200"
                title="New File"
              >
                +
              </button>
            )}
            <button 
              onClick={handleDelete}
              className="text-slate-400 hover:text-red-600 p-0.5 rounded hover:bg-slate-200 text-xs"
              title="Delete"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      
      {node.isDirectory && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode key={child.path} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const { workspacePath, fileTree, openWorkspace, createFile } = useAppStore();

  const workspaceName = workspacePath
    ? workspacePath.replace(/\\/g, '/').split('/').pop() ?? workspacePath
    : 'No Workspace';

  const handleRootCreate = () => {
    if (!workspacePath) return;
    const name = prompt('New file name (e.g. note.md):');
    if (name) {
      createFile(workspacePath, name.endsWith('.md') || name.endsWith('.txt') ? name : `${name}.md`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Workspace header */}
      <div className="px-3 py-2.5 border-b border-slate-200 bg-[#ececec] shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-slate-400 text-xs shrink-0">🗂</span>
            <span className="text-[12px] font-semibold text-slate-600 truncate" title={workspacePath ?? ''}>
              {workspaceName}
            </span>
          </div>
          <button
            onClick={openWorkspace}
            className="shrink-0 text-[11px] text-slate-400 hover:text-blue-600 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-200"
            title="Switch Workspace"
          >
            Switch
          </button>
        </div>
        {workspacePath && (
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Explorer</span>
            <button
              onClick={handleRootCreate}
              className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors ml-auto"
              title="New File"
            >
              + File
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {!workspacePath ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm p-4 text-center">
            <p>No folder opened.</p>
            <button 
              onClick={openWorkspace}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Open Workspace
            </button>
          </div>
        ) : fileTree.length === 0 ? (
          <div className="p-4 text-slate-400 text-sm text-center">
            Empty folder.
            <button 
              onClick={handleRootCreate}
              className="block mx-auto mt-2 text-blue-600 hover:underline"
            >
              Create File
            </button>
          </div>
        ) : (
          fileTree.map((node) => (
            <FileTreeNode key={node.path} node={node} depth={0} />
          ))
        )}
      </div>
    </div>
  );
};
