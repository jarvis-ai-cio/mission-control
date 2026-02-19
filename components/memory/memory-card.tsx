"use client";
import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";

export function MemoryCard({ memory }: { memory: Doc<"memories"> }) {
  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">{memory.filename}</h3>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(memory.syncedAt), { addSuffix: true })}
        </span>
      </div>
      <div className="prose prose-sm prose-invert max-w-none text-muted-foreground">
        <ReactMarkdown>{memory.content.slice(0, 600) + (memory.content.length > 600 ? "..." : "")}</ReactMarkdown>
      </div>
    </Card>
  );
}
