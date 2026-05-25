"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/search`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-lg mb-8 bg-gray-100 border-b-2 border-transparent focus-within:border-gray-400 transition-colors p-1">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar historias..."
        className="flex-1 bg-transparent p-3 text-black focus:outline-none text-sm placeholder-gray-400 font-bold"
      />
      <button 
        type="submit"
        className="px-4 text-gray-400 hover:text-black transition-colors text-lg"
        title="Buscar"
      >
        ↵
      </button>
    </form>
  );
}
