"use client";
import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { KanbanColumn } from "./kanban-column";
import { Doc } from "@/convex/_generated/dataModel";

type Status = "backlog" | "in_progress" | "done";
const COLUMNS: Status[] = ["backlog", "in_progress", "done"];

export function KanbanBoard() {
  const tasks = useQuery(api.tasks.list) ?? [];
  const updateStatus = useMutation(api.tasks.updateStatus);
  const sensors = useSensors(useSensor(PointerSensor));

  const tasksByStatus = COLUMNS.reduce((acc, status) => {
    acc[status] = tasks.filter((t: Doc<"tasks">) => t.status === status);
    return acc;
  }, {} as Record<Status, Doc<"tasks">[]>);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const newStatus = over.id as Status;
    const task = tasks.find((t: Doc<"tasks">) => t._id === active.id);
    if (task && task.status !== newStatus) {
      await updateStatus({ id: task._id, status: newStatus });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
        {COLUMNS.map((status) => (
          <KanbanColumn key={status} status={status} tasks={tasksByStatus[status]} />
        ))}
      </div>
    </DndContext>
  );
}
