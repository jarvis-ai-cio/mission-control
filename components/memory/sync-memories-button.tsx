"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

type SyncStatus = "idle" | "loading" | "success" | "error";

export function SyncMemoriesButton() {
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSync() {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/memories/trigger-sync", { method: "POST" });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      setStatus("success");
      setMessage("Sync triggered!");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Sync failed");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSync}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="mr-2 h-4 w-4" />
        )}
        {status === "loading" ? "Syncing…" : "Sync Memories"}
      </Button>
      {message && (
        <p
          className={`text-xs ${
            status === "error" ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
