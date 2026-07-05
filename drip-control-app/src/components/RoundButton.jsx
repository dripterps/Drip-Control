import { C } from "../lib/constants";

export default function RoundButton({ onClick, disabled, tone, ariaLabel, children }) {
  const color = tone === "minus" ? C.coral : C.mint;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="dc-round-btn"
      style={{
        width: 76, height: 76, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        background: C.panelRaised, border: `2px solid ${disabled ? C.hairline : color + "55"}`,
        color: disabled ? C.textTertiary : color, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}
