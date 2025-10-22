"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Note } from "@/lib/theme";

type State = {
  notes: Note[];
  activeId: string | null;
  search: string;
  filter: "all" | "favorites" | { folder: string };
};

const STORAGE_KEY = "notes.local.v1";

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

function now() {
  return Date.now();
}

const SAMPLE_NOTES: Note[] = [
  {
    id: uid(),
    title: "Welcome to Ocean Notes",
    content:
      "This is your personal notes space.\n\n- Create a new note from the sidebar\n- Use the search bar to filter\n- Press Ctrl/Cmd+S to save\n\nEnjoy!",
    updatedAt: now(),
    favorite: true,
    folder: "Getting Started",
  },
  {
    id: uid(),
    title: "Project Ideas",
    content: "• Build a reading list\n• Track daily goals\n• Draft blog posts",
    updatedAt: now(),
    favorite: false,
    folder: "Ideas",
  },
];

export type NotesApi = {
  notes: Note[];
  filteredNotes: Note[];
  activeNote: Note | null;
  activeId: string | null;
  search: string;
  filter: State["filter"];
  setSearch: (q: string) => void;
  setFilter: (f: State["filter"]) => void;
  setActive: (id: string | null) => void;
  createNote: (folder?: string) => Note;
  updateNote: (id: string, patch: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
};

function safeLoad(): Note[] {
  if (typeof window === "undefined") return SAMPLE_NOTES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SAMPLE_NOTES;
    const parsed = JSON.parse(raw) as Note[];
    return Array.isArray(parsed) ? parsed : SAMPLE_NOTES;
  } catch {
    return SAMPLE_NOTES;
  }
}

function safeSave(notes: Note[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore quota errors
  }
}

// PUBLIC_INTERFACE
export function useLocalNotes(): NotesApi {
  /** Hook providing localStorage-backed CRUD for notes with search/filter and active note management. */
  const [notes, setNotes] = useState<Note[]>(() => safeLoad());
  const [activeId, setActive] = useState<string | null>(() => (notes[0]?.id ?? null));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<State["filter"]>("all");

  // Persist to localStorage when notes change (debounced)
  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => safeSave(notes), 200);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [notes]);

  // Keyboard shortcut: Ctrl/Cmd+S => touch update time of active note (acts as save)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!activeId) return;
        setNotes((prev) =>
          prev.map((n) => (n.id === activeId ? { ...n, updatedAt: now() } : n))
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  const createNote = useCallback(
    (folder?: string) => {
      const n: Note = {
        id: uid(),
        title: "Untitled",
        content: "",
        updatedAt: now(),
        favorite: false,
        folder,
      };
      setNotes((prev) => [n, ...prev]);
      setActive(n.id);
      return n;
    },
    []
  );

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: now() } : n))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setActive((curr) => (curr === id ? null : curr));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite, updatedAt: now() } : n))
    );
  }, []);

  const activeNote = useMemo(
    () => (activeId ? notes.find((n) => n.id === activeId) ?? null : null),
    [activeId, notes]
  );

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = notes;
    if (filter === "favorites") list = list.filter((n) => n.favorite);
    else if (typeof filter === "object" && "folder" in filter)
      list = list.filter((n) => n.folder === filter.folder);

    if (!q) return list.sort((a, b) => b.updatedAt - a.updatedAt);

    return list
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, search, filter]);

  return {
    notes,
    filteredNotes,
    activeNote,
    activeId,
    search,
    filter,
    setSearch,
    setFilter,
    setActive,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
  };
}
