import { C } from "../lib/constants";

export default function SegButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="dc-hoverable"
      style={{
        padding: "7px 13px", borderRadius: 999, fontSize: 12, fontWeight: 600,
        background: active ? C.violet + "22" : "transparent", border: `1px solid ${active ? C.violet + "88" : C.hairline}`,
        color: active ? C.textPrimary : C.textSecondary, cursor: "pointer", transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}
