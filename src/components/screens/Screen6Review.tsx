import MobileShell from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { SelfCareEntry, formatDateShort } from "@/lib/selfcare-data";
import { Pencil, CalendarDays, Home } from "lucide-react";

interface Screen6Props {
  entry: SelfCareEntry;
  onEdit: () => void;
  onHistory: () => void;
  onHome: () => void;
}

const Screen6Review = ({ entry, onEdit, onHistory, onHome }: Screen6Props) => {
  const rows: { label: string; value: string }[] = [
    { label: "Date", value: formatDateShort(entry.date) },
    { label: "Self-Care", value: entry.didSelfCare ? "Yes ✅" : "No ❌" },
  ];

  if (entry.didSelfCare) {
    if (entry.activities.length) rows.push({ label: "Activities", value: entry.activities.join(", ") });
    if (entry.duration) rows.push({ label: "Duration", value: entry.duration });
  } else {
    if (entry.preventionReasons.length) rows.push({ label: "Prevented by", value: entry.preventionReasons.join(", ") });
    if (entry.helpfulType) rows.push({ label: "Would've helped", value: entry.helpfulType });
  }

  if (entry.mood) rows.push({ label: "Mood", value: `${entry.moodEmoji} ${entry.mood}` });

  return (
    <MobileShell step={4} totalSteps={4}>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Your Entry 📋
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Here's a summary of today's check-in</p>

      <div className="mt-6 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="rounded-xl bg-card p-4 border border-border">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {r.label}
            </span>
            <p className="mt-1 text-sm font-medium text-card-foreground">{r.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 pb-4">
        <Button onClick={onEdit} variant="outline" className="w-full rounded-2xl py-5 gap-2">
          <Pencil className="h-4 w-4" /> Edit Entry
        </Button>
        <Button onClick={onHistory} variant="outline" className="w-full rounded-2xl py-5 gap-2">
          <CalendarDays className="h-4 w-4" /> Weekly History
        </Button>
        <Button onClick={onHome} className="w-full rounded-2xl py-5 gap-2">
          <Home className="h-4 w-4" /> New Check-In
        </Button>
      </div>
    </MobileShell>
  );
};

export default Screen6Review;
