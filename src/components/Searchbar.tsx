'use client';

import { Search } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Suggestion = {
  id: string | number;
  label: string;
  meta?: string;
};

interface SearchbarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  suggestions?: Suggestion[];
  onSelectSuggestion?: (s: Suggestion) => void;
}

export default function Searchbar({
  value = '',
  placeholder = 'Search something....',
  onChange,
  onSearch,
  debounceMs = 300,
  suggestions = [],
  onSelectSuggestion,
}: SearchbarProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Debounce input -> call onSearch
  useEffect(() => {
    const t = setTimeout(() => {
      onSearch?.(query);
    }, debounceMs);
    return () => clearTimeout(t);
  }, [query, debounceMs, onSearch]);

  const filtered = useMemo(() => {
    if (!query) return suggestions;
    const q = query.toLowerCase();
    return suggestions.filter((s) => s.label.toLowerCase().includes(q));
  }, [query, suggestions]);

  const handleChange = (v: string) => {
    setQuery(v);
    onChange?.(v);
    setOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    onChange?.('');
    onSearch?.('');
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && filtered[highlightIndex]) {
        const s = filtered[highlightIndex];
        onSelectSuggestion?.(s);
        setQuery(s.label);
        setOpen(false);
      } else {
        onSearch?.(query);
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <div className="flex items-center border rounded-md px-3 py-1 gap-2 bg-white">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search"
          className="flex-1 outline-none bg-transparent"
        />
        {query ? (
          <button aria-label="Clear search" onClick={handleClear} className="text-sm text-gray-500">
            Clear
          </button>
        ) : null}

        {/* Search icon button at the far right */}
        <button
          type="button"
          aria-label="Submit search"
          title="Search"
          onClick={() => onSearch?.(query)}
          className="ml-1 p-1 rounded text-gray-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Search className="h-5 w-5" color="#706C6C" />
        </button>
      </div>

      {open && filtered.length > 0 && (
        <ul
          role="listbox"
          aria-label="Search suggestions"
          className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow max-h-56 overflow-auto"
        >
          {filtered.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={highlightIndex === i}
              onMouseDown={(e) => {
                // prevent blur
                e.preventDefault();
                onSelectSuggestion?.(s);
                setQuery(s.label);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlightIndex(i)}
              className={`px-3 py-2 cursor-pointer ${highlightIndex === i ? 'bg-slate-100' : ''}`}
            >
              <div className="text-sm">{s.label}</div>
              {s.meta ? <div className="text-xs text-gray-500">{s.meta}</div> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
