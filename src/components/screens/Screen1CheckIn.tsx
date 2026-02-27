import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MobileShell from "@/components/MobileShell";
import OptionChip from "@/components/OptionChip";
import ContinueButton from "@/components/ContinueButton";

interface Screen1Props {
  date: Date;
  onDateChange: (d: Date) => void;
  onContinue: (didSelfCare: boolean) => void;
}

const Screen1CheckIn = ({ date, onDateChange, onContinue }: Screen1Props) => {
  const [answer, setAnswer] = useState<boolean | null>(null);

  return (
    <MobileShell step={1} totalSteps={4}>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Self-Care Check-In 🌿
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">How did you care for yourself today?</p>

      {/* Date */}
      <div className="mt-6">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "mt-2 w-full justify-start rounded-xl py-5 text-left font-normal",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && onDateChange(d)}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Self-care question */}
      <div className="mt-8">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Did you practice self-care today? *
        </label>
        <div className="mt-3 flex gap-3">
          <OptionChip label="Yes" selected={answer === true} onToggle={() => setAnswer(true)} emoji="✅" />
          <OptionChip label="No" selected={answer === false} onToggle={() => setAnswer(false)} emoji="❌" />
        </div>
      </div>

      <ContinueButton
        onClick={() => answer !== null && onContinue(answer)}
        disabled={answer === null}
      />
    </MobileShell>
  );
};

export default Screen1CheckIn;
