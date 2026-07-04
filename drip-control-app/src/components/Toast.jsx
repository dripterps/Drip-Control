import { C } from "../lib/constants";

export default function Toast({ toast }) {
  const color = toast.kind === "success" ? C.mint : toast.kind === "error" ? C.coral : C.violet;
  return (
    <div
      className="dc-fade-in"
      style={{
        position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 50,
        background: C.panelRaised2, border: `1px solid ${C.hairline}`, borderLeft: `3px solid ${color}`, borderRadius: 12,
        padding: "11px 16px 11px 14px", fontSize: 13, color: C.textPrimary, boxShadow: "0 12px 30px rgba(0,0,0,0.5)", maxWidth: "90vw",
      }}
    >
      {toast.msg}
    </div>
  );
}
