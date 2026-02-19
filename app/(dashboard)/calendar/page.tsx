import { CronCalendar } from "@/components/calendar/cron-calendar";

export default function CalendarPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-muted-foreground text-sm mt-0.5">All scheduled cron jobs — live from OpenClaw</p>
      </div>
      <CronCalendar />
    </div>
  );
}
