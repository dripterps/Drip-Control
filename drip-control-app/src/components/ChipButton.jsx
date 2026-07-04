import { C } from "../lib/constants";

export default function ChipButton({ onClick, disabled, icon, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 dc-hoverable"
      style={{
        padding: "9px 16px", minHeight: 40, borderRadius: 999, fontSize: 13, fontWeight: 600,
        background: C.panelRaised, border: `1px solid ${C.hairline}`, color: disabled ? C.textTertiary : C.textPrimary,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "all 0.15s ease",
      }}
    >
      {icon}{children}
    </button>
  );
}
