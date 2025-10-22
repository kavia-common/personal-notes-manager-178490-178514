"use client";

import React from "react";

type SidebarProps = {
  onNewNote: () => void;
  onSelectAll: () => void;
  onSelectFavorites: () => void;
  onSelectFolder: (folder: string) => void;
  activeFilter: "all" | "favorites" | { folder: string };
  folders: string[];
};

export default function Sidebar({
  onNewNote,
  onSelectAll,
  onSelectFavorites,
  onSelectFolder,
  activeFilter,
  folders,
}: SidebarProps) {
  const isActive = (key: "all" | "favorites" | { folder: string }) => {
    if (typeof key === "string") {
      return activeFilter === key;
    }
    return typeof activeFilter === "object" && "folder" in activeFilter && activeFilter.folder === key.folder;
  };

  const base =
    "w-full text-left rounded-md px-3 py-2 text-sm transition shadow-subtle border border-transparent hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--ocean-ring)]";

  const active =
    "bg-blue-50/70 text-blue-700 border-blue-100";

  const inactive = "text-[color:var(--ocean-text)]/80";

  return (
    <aside className="h-full w-64 shrink-0 p-3 pr-2">
      <div className="h-full rounded-xl bg-[color:var(--ocean-surface)] border border-black/5 shadow-subtle flex flex-col">
        <div className="p-3 border-b border-black/5">
          <button
            onClick={onNewNote}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--ocean-primary)] px-3 py-2 text-sm font-medium text-white transition hover:brightness-105 active:brightness-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--ocean-ring)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
              <path d="M11 5h2v14h-2zM5 11h14v2H5z" />
            </svg>
            New Note
          </button>
        </div>
        <nav className="p-3 space-y-2">
          <button onClick={onSelectAll} className={`${base} ${isActive("all") ? active : inactive}`}>
            All Notes
          </button>
          <button onClick={onSelectFavorites} className={`${base} ${isActive("favorites") ? active : inactive}`}>
            Favorites
          </button>
          <div className="pt-2">
            <div className="px-1 text-xs uppercase tracking-wide text-[color:var(--ocean-muted)] mb-1">
              Folders
            </div>
            <div className="space-y-1">
              {folders.length === 0 ? (
                <div className="text-xs text-[color:var(--ocean-muted)] px-2 py-1.5">
                  No folders yet
                </div>
              ) : (
                folders.map((f) => (
                  <button
                    key={f}
                    onClick={() => onSelectFolder(f)}
                    className={`${base} ${isActive({ folder: f }) ? active : inactive}`}
                  >
                    {f}
                  </button>
                ))
              )}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
