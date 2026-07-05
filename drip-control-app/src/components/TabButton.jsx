import { C } from "../lib/constants";

export default function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 dc-hoverable"
      style={{
        padding: "9px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
        background: active ? C.panelRaised2 : "transparent",
        color: active ? C.textPrimary : C.textSecondary,
        border: `1px solid ${active ? C.hairline : "transparent"}`,
        cursor: "pointer", transition: "all 0.2s ease",
      }}
    >
      {icon} {label}
    </button>
  );
}
