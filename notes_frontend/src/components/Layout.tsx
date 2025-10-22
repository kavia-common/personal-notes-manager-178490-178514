"use client";

import React, { useMemo } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NotesList from "./NotesList";
import Editor from "./Editor";
import SearchBar from "./SearchBar";
import { useLocalNotes } from "@/hooks/useLocalNotes";

export default function Layout() {
  const {
    filteredNotes,
    notes,
    activeNote,
    activeId,
    search,
    setSearch,
    filter,
    setFilter,
    setActive,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
  } = useLocalNotes();

  const folders = useMemo(() => {
    const s = new Set<string>();
    for (const n of notes) {
      if (n.folder) s.add(n.folder);
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  return (
    <div className="min-h-screen bg-[color:var(--ocean-bg)]">
      <div className="bg-gradient-to-br from-blue-500/10 to-gray-50">
        <Header onNewNote={() => createNote()} />
      </div>

      <main className="mx-auto container-max px-4 py-4">
        <div className="mb-3">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <section className="h-[calc(100vh-180px)] min-h-[520px] flex">
          <Sidebar
            onNewNote={() => createNote()}
            onSelectAll={() => setFilter("all")}
            onSelectFavorites={() => setFilter("favorites")}
            onSelectFolder={(f) => setFilter({ folder: f })}
            activeFilter={filter}
            folders={folders}
          />
          <NotesList
            notes={filteredNotes}
            activeId={activeId}
            onSelect={setActive}
            onToggleFavorite={toggleFavorite}
            onDelete={deleteNote}
          />
          <Editor
            note={activeNote}
            onChange={(patch) => {
              if (activeId) updateNote(activeId, patch);
            }}
          />
        </section>
      </main>
    </div>
  );
}
