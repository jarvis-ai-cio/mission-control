"use client";
import { useEffect, useState } from "react";
import { CronEventCard } from "./cron-event-card";
import { Loader2 } from "lucide-react";

export function CronCalendar() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cron")
      .then((r) => r.json())
      .then((data) => { setJobs(data.jobs ?? data); setLoading(false); })
      .catch(() => { setError("Failed to load cron jobs"); setLoading(false); });
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>;
  if (error) return <div className="text-center text-destructive py-12">{error}</div>;
  if (jobs.length === 0) return <div className="text-center text-muted-foreground py-12">No cron jobs scheduled.</div>;

  const active = jobs.filter((j: any) => j.enabled !== false);
  const disabled = jobs.filter((j: any) => j.enabled === false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Active ({active.length})</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((job: any) => <CronEventCard key={job.id} job={job} />)}
        </div>
      </div>
      {disabled.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Disabled ({disabled.length})</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {disabled.map((job: any) => <CronEventCard key={job.id} job={job} />)}
          </div>
        </div>
      )}
    </div>
  );
}
