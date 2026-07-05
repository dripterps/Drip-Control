import { Droplet } from "lucide-react";
import { C } from "../lib/constants";

export default function DripMeter({ value, max, height = 13, status, showDroplet = true }) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div className="relative w-full" style={{ height }}>
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ background: C.panelRaised, boxShadow: "inset 0 2px 6px rgba(0,0,0,0.55)" }}
      >
        <div
          className="h-full rounded-full relative overflow-hidden dc-transition-fill"
          style={{ width: `${pct}%`, backgroundImage: status.gradient }}
        >
          <div className="dc-shimmer absolute inset-0" />
        </div>
      </div>
      {showDroplet && pct > 2 && (
        <div
          className="absolute dc-transition-fill"
          style={{ left: `calc(${pct}% - ${(height + 8) / 2}px)`, top: "50%", transform: "translateY(-50%)" }}
        >
          <Droplet size={height + 8} strokeWidth={2} style={{ color: C.ink }} fill="#FFFFFF" />
        </div>
      )}
    </div>
  );
}
