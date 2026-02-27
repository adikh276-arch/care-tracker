import { useMemo } from "react";
import MobileShell from "@/components/MobileShell";
import ContinueButton from "@/components/ContinueButton";
import { POSITIVE_STATEMENTS, SUPPORTIVE_STATEMENTS } from "@/lib/selfcare-data";

interface Screen5Props {
  didSelfCare: boolean;
  onContinue: () => void;
}

const Screen5Statement = ({ didSelfCare, onContinue }: Screen5Props) => {
  const statement = useMemo(() => {
    const list = didSelfCare ? POSITIVE_STATEMENTS : SUPPORTIVE_STATEMENTS;
    return list[Math.floor(Math.random() * list.length)];
  }, [didSelfCare]);

  return (
    <MobileShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="text-6xl mb-6">{didSelfCare ? "🌿" : "🤍"}</div>
        <p className="font-display text-xl font-semibold leading-relaxed tracking-tight px-4">
          {statement}
        </p>
      </div>
      <ContinueButton onClick={onContinue} />
    </MobileShell>
  );
};

export default Screen5Statement;
