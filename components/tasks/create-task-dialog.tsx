"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<"chuka" | "jarvis">("chuka");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const create = useMutation(api.tasks.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await create({ title, description: description || undefined, status: "backlog", assignee, priority });
    setTitle(""); setDescription(""); setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create Task</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required /></div>
          <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional details" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Assign to</Label>
              <Select value={assignee} onValueChange={(v) => setAssignee(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="chuka">Chuka</SelectItem>
                  <SelectItem value="jarvis">Jarvis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">Create Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
