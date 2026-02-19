"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MemoryCard } from "./memory-card";

export function MemoryList({ query }: { query: string }) {
  const memories = useQuery(
    query ? api.memories.search : api.memories.list,
    query ? { query } : {}
  ) ?? [];

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
