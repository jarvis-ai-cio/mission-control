"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Doc } from "@/convex/_generated/dataModel";

const PRIORITY_COLORS = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const;

const ASSIGNEE_COLORS = {
  jarvis: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  chuka: "bg-green-500/10 text-green-400 border-green-500/20",
};

export function TaskCard({ task }: { task: Doc<"tasks"> }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 cursor-grab active:cursor-grabbing space-y-2"
    >
      <p className="text-sm font-medium leading-snug">{task.title}</p>
      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs px-2 py-0.5 rounded-full border ${ASSIGNEE_COLORS[task.assignee]}`}>
          {task.assignee}
        </span>
        {task.priority && (
          <Badge variant={PRIORITY_COLORS[task.priority] as any} className="text-xs">
            {task.priority}
          </Badge>
        )}
      </div>
    </Card>
  );
}
