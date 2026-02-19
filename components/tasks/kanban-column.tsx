"use client";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./task-card";
import { Doc } from "@/convex/_generated/dataModel";

const STATUS_LABELS = {
  backlog: "Backlog",
  in_progress: "In Progress",
  done: "Done",
};

const STATUS_COLORS = {
  backlog: "text-muted-foreground",
  in_progress: "text-blue-400",
  done: "text-green-400",
};

export function KanbanColumn({
  status,
  tasks,
}: {
  status: "backlog" | "in_progress" | "done";
  tasks: Doc<"tasks">[];
}) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="flex flex-col flex-1 min-w-[280px] max-w-sm">
      <div className="flex items-center gap-2 mb-3 px-1">
        <h3 className={`font-medium text-sm ${STATUS_COLORS[status]}`}>{STATUS_LABELS[status]}</h3>
        <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">{tasks.length}</span>
      </div>
      <div ref={setNodeRef} className="flex-1 space-y-2 min-h-[200px] rounded-lg p-2 bg-muted/30">
        <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => <TaskCard key={task._id} task={task} />)}
        </SortableContext>
      </div>
    </div>
  );
}
