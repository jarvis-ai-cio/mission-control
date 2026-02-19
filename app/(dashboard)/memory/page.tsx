"use client";
import { useState } from "react";
import { MemorySearch } from "@/components/memory/memory-search";
import { MemoryList } from "@/components/memory/memory-list";
import { useDebounce } from "@/hooks/use-debounce";

export default function MemoryPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Memory</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Jarvis&apos;s long-term memory — searchable</p>
      </div>
      <MemorySearch value={query} onChange={setQuery} />
      <MemoryList query={debouncedQuery} />
    </div>
  );
}
