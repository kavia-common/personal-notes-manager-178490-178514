"use client";

import React from "react";
import type { Note } from "@/lib/theme";

type NotesListProps = {
  notes: Note[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
};

function timeAgo(ts: number) {
  const diff = Math.max(0, Date.now() - ts);
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function NotesList({
  notes,
  activeId,
  onSelect,
  onToggleFavorite,
  onDelete,
}: NotesListProps) {
  return (
    <div className="h-full w-80 shrink-0 p-3">
      <div className="h-full rounded-xl bg-[color:var(--ocean-surface)] border border-black/5 shadow-subtle overflow-hidden flex flex-col">
        <div className="px-3 py-2 border-b border-black/5 text-sm text-[color:var(--ocean-muted)]">
          {notes.length} note{notes.length !== 1 ? "s" : ""}
        </div>
        <ul role="list" className="flex-1 overflow-auto divide-y divide-black/5">
          {notes.length === 0 ? (
            <li className="p-6 text-sm text-[color:var(--ocean-muted)]">
              No notes match your filters.
            </li>
          ) : (
            notes.map((n) => {
              const preview =
                n.content.trim().length > 0
                  ? n.content.trim().split("\n").slice(0, 2).join(" ").slice(0, 120)
                  : "Empty note";
              const isActive = n.id === activeId;
              return (
                <li
                  key={n.id}
                  className={`group cursor-pointer transition ${
                    isActive ? "bg-blue-50/60" : "hover:bg-gray-50"
                  }`}
                  onClick={() => onSelect(n.id)}
                >
                  <div className="px-3 py-3 flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-[color:var(--ocean-text)] truncate">
                          {n.title || "Untitled"}
                        </h3>
                        <div className="text-[10px] text-[color:var(--ocean-muted)] shrink-0">
                          {timeAgo(n.updatedAt)}
                        </div>
                      </div>
                      <p className="mt-0.5 text-xs text-[color:var(--ocean-muted)] line-clamp-2">
                        {preview}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        aria-label="Toggle favorite"
                        className="p-1 rounded hover:bg-white border border-black/5"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(n.id);
                        }}
                        title="Favorite"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" className={n.favorite ? "fill-amber-500" : "fill-gray-300"}>
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 
                          3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 
                          13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 
                          6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                      <button
                        aria-label="Delete note"
                        className="p-1 rounded hover:bg-white border border-black/5"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(n.id);
                        }}
                        title="Delete"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" className="fill-red-500/80">
                          <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 
                          4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
