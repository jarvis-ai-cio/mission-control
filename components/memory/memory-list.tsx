"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MemoryCard } from "./memory-card";

export function MemoryList({ query }: { query: string }) {
  const searchResults = useQuery(api.memories.search, query ? { query } : "skip");
  const allResults = useQuery(api.memories.list, query ? "skip" : {});
  const memories = (query ? searchResults : allResults) ?? [];

  if (memories.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        {query ? "No memories match your search." : "No memories synced yet."}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {memories.map((m: any) => <MemoryCard key={m._id} memory={m} />)}
    </div>
  );
}
