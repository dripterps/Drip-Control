import { C } from "../lib/constants";
import { useAnimatedNumber } from "./AnimatedNumber";

export default function StatCard({ icon, label, value, prefix = "", subtext }) {
  const display = useAnimatedNumber(value);
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.hairline}`, borderRadius: 16, padding: "14px 16px" }}>
      <div className="flex items-center gap-1.5" style={{ color: C.textTertiary, marginBottom: 6 }}>
        {icon}<span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}>{label}</span>
      </div>
      <p className="dc-font-display" style={{ fontSize: 20, fontWeight: 700, color: C.textPrimary }}>
        {prefix}{Math.round(display).toLocaleString("en-US")}
      </p>
      {subtext && <p style={{ fontSize: 11, color: C.textTertiary, marginTop: 2 }}>{subtext}</p>}
    </div>
  );
}
