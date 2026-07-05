import { C } from "../lib/constants";

export default function ToggleRow({ label, checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      className="flex items-center gap-3"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <span aria-hidden="true" style={{ width: 38, height: 22, borderRadius: 999, background: checked ? C.violet : C.panelRaised2, position: "relative", transition: "background 0.2s ease", border: `1px solid ${C.hairline}`, flexShrink: 0 }}>
        <span style={{ position: "absolute", top: 2, left: checked ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s ease" }} />
      </span>
      <span style={{ fontSize: 13, color: C.textSecondary, textAlign: "left" }}>{label}</span>
    </button>
  );
}
