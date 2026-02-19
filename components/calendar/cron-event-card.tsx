import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";

interface CronJob {
  id: string;
  name: string;
  schedule: { kind: string; expr?: string; everyMs?: number };
  enabled: boolean;
  lastRun?: { status: string; completedAt: number };
  nextRun?: number;
}

function humanSchedule(schedule: CronJob["schedule"]): string {
  if (schedule.kind === "cron" && schedule.expr) return schedule.expr;
  if (schedule.kind === "every" && schedule.everyMs) {
    const mins = schedule.everyMs / 60000;
    if (mins < 60) return `Every ${mins} min`;
    return `Every ${mins / 60}h`;
  }
  return schedule.kind;
}

export function CronEventCard({ job }: { job: CronJob }) {
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-sm">{job.name || job.id}</p>
          <p className="text-xs text-muted-foreground font-mono">{humanSchedule(job.schedule)}</p>
        </div>
        <Badge variant={job.enabled ? "default" : "secondary"} className="shrink-0">
          {job.enabled ? "active" : "disabled"}
        </Badge>
      </div>
      {job.nextRun && (
        <p className="text-xs text-muted-foreground">
          Next: {formatDistanceToNow(new Date(job.nextRun), { addSuffix: true })}
        </p>
      )}
      {job.lastRun && (
        <p className={`text-xs ${job.lastRun.status === "success" ? "text-green-400" : "text-red-400"}`}>
          Last: {job.lastRun.status} · {format(new Date(job.lastRun.completedAt), "MMM d, HH:mm")}
        </p>
      )}
    </Card>
  );
}
