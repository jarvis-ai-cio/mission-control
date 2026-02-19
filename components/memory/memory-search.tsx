"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function MemorySearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search memories..."
        className="pl-9"
      />
    </div>
  );
}
