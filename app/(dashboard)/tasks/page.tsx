import { KanbanBoard } from "@/components/tasks/kanban-board";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";

export default function TasksPage() {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Shared board — Jarvis & Chuka</p>
        </div>
        <CreateTaskDialog />
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
}
