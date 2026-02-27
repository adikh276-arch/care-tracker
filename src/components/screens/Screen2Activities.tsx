import { useState } from "react";
import MobileShell from "@/components/MobileShell";
import OptionChip from "@/components/OptionChip";
import ContinueButton from "@/components/ContinueButton";
import { ACTIVITIES, DURATIONS } from "@/lib/selfcare-data";

interface Screen2Props {
  onContinue: (activities: string[], duration: string) => void;
}

const Screen2Activities = ({ onContinue }: Screen2Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState("");

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  return (
    <MobileShell step={2} totalSteps={4}>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Your Activities 🎯
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Which self-care activities did you do today?</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {ACTIVITIES.map((a) => (
          <OptionChip key={a} label={a} selected={selected.includes(a)} onToggle={() => toggle(a)} />
        ))}
      </div>

      <div className="mt-8">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Time spent on self-care (optional)
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <OptionChip key={d} label={d} selected={duration === d} onToggle={() => setDuration(duration === d ? "" : d)} />
          ))}
        </div>
      </div>

      <ContinueButton
        onClick={() => onContinue(selected, duration)}
        disabled={selected.length === 0}
      />
    </MobileShell>
  );
};

export default Screen2Activities;
