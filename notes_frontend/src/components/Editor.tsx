"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Note } from "@/lib/theme";

type EditorProps = {
  note: Note | null;
  onChange: (patch: Partial<Note>) => void;
};

export default function Editor({ note, onChange }: EditorProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const timer = useRef<number | null>(null);

  // Sync incoming note -> local state
  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id, note?.title, note?.content]);

  // Debounce updates
  useEffect(() => {
    if (!note) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      onChange({ title, content });
    }, 250);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [title, content, note, onChange]);

  if (!note) {
    return (
      <div className="flex-1 p-6">
        <div className="h-full rounded-xl border border-dashed border-black/10 bg-white/60 flex items-center justify-center text-center">
          <div>
            <h3 className="text-lg font-medium text-[color:var(--ocean-text)] mb-1">
              No note selected
            </h3>
            <p className="text-sm text-[color:var(--ocean-muted)]">
              Choose a note from the list or create a new one to begin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-3 pl-2">
      <div className="h-full rounded-xl bg-[color:var(--ocean-surface)] border border-black/5 shadow-subtle overflow-hidden flex flex-col">
        <div className="p-4 border-b border-black/5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl font-semibold bg-transparent outline-none placeholder-[color:var(--ocean-muted)]"
            placeholder="Note title"
            aria-label="Note title"
          />
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full min-h-[300px] resize-none p-4 text-sm leading-6 outline-none placeholder-[color:var(--ocean-muted)]"
            placeholder="Start typing here..."
            aria-label="Note content"
          />
        </div>
      </div>
    </div>
  );
}
