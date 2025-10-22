"use client";

import React from "react";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        className="w-full rounded-lg border border-black/10 bg-white/90 pl-9 pr-3 py-2 text-sm text-[color:var(--ocean-text)] placeholder-[color:var(--ocean-muted)] shadow-sm transition focus:border-[color:var(--ocean-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ocean-ring)]"
        placeholder={placeholder ?? "Search notes..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search notes"
      />
      <div className="absolute left-2.5 top-2.5 text-[color:var(--ocean-muted)]">
        <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
          <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.23 5.01 12.22 2 8.62 2S2 5.01 2 8.39c0 3.38 3.01 6.39 6.62 6.39a6.47 6.47 0 004.1-1.43l.27.28v.79L20.49 22 22 20.49 15.5 14zm-6.88 0C6.01 14 4 11.99 4 9.61S6.01 5.22 8.62 5.22s4.62 2.01 4.62 4.39-2.01 4.39-4.62 4.39z" />
        </svg>
      </div>
    </div>
  );
}
