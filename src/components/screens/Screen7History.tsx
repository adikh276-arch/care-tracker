import MobileShell from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { getLast7Days, formatDateShort, SelfCareEntry } from "@/lib/selfcare-data";
import { ArrowLeft } from "lucide-react";

interface Screen7Props {
  onBack: () => void;
}

const Screen7History = ({ onBack }: Screen7Props) => {
  const entries = getLast7Days();

  return (
    <MobileShell>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="rounded-xl p-2 hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Weekly History 📅
        </h1>
      </div>

      {entries.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-4xl mb-3">🫧</p>
          <p className="text-muted-foreground text-sm">No entries in the last 7 days</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <DayCard key={entry.date} entry={entry} />
          ))}
        </div>
      )}

      <div className="mt-8 pb-4">
        <Button onClick={onBack} className="w-full rounded-2xl py-5" variant="outline">
          Back to Check-In
        </Button>
      </div>
    </MobileShell>
  );
};

const DayCard = ({ entry }: { entry: SelfCareEntry }) => {
  const keyInfo = entry.didSelfCare
    ? entry.activities[0] || "Self-care done"
    : entry.preventionReasons[0] || "No self-care";

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
      <div className="text-2xl">{entry.moodEmoji || "—"}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-card-foreground">
          {formatDateShort(entry.date)}
        </p>
        <p className="text-xs text-muted-foreground truncate">{keyInfo}</p>
      </div>
      <div
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          entry.didSelfCare
            ? "bg-primary/15 text-primary"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {entry.didSelfCare ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default Screen7History;
