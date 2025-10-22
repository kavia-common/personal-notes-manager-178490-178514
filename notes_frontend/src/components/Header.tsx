"use client";

import React from "react";

type HeaderProps = {
  onNewNote: () => void;
};

export default function Header({ onNewNote }: HeaderProps) {
  return (
    <header
      className={`w-full border-b border-black/5 bg-[color:var(--ocean-surface)]`}
      style={{}}
    >
      <div className="mx-auto container-max px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-9 w-9 rounded-lg bg-gradient-to-br ${"from-blue-500/40 to-blue-600/40"} ring-1 ring-black/5 flex items-center justify-center`}
          >
            <span className="text-white/95 text-lg font-semibold">N</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[color:var(--ocean-text)] text-lg font-semibold tracking-tight">
              Ocean Notes
            </h1>
            <p className="text-xs text-[color:var(--ocean-muted)] -mt-0.5">
              Capture. Organize. Reflect.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNewNote}
            className="inline-flex items-center gap-2 rounded-md bg-[color:var(--ocean-primary)] px-3 py-2 text-sm font-medium text-white shadow-subtle transition hover:brightness-105 active:brightness-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--ocean-ring)]"
            aria-label="Create new note"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
              <path d="M11 5h2v14h-2zM5 11h14v2H5z" />
            </svg>
            New Note
          </button>
        </div>
      </div>
    </header>
  );
}
