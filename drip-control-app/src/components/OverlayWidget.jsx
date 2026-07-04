import AnimatedNumber from "./AnimatedNumber";
import DripMeter from "./DripMeter";
import { C, getStatus, OVERLAY_SIZES, MINI_SIZE } from "../lib/constants";

// This is the exact same component used in three places: the mini "what
// viewers see" preview on the dashboard, the phone-frame preview on the
// Overlay tab, and the real overlay page loaded by TikTok LIVE Studio's
// Link Source. Keeping it as one component guarantees what you preview is
// exactly what ships.
export default function OverlayWidget({ bagsLeft, totalBags, variant = "full", sizeTier = "lg" }) {
  const status = getStatus(bagsLeft, totalBags);
  const isMini = variant === "mini";
  const s = isMini ? MINI_SIZE : OVERLAY_SIZES[sizeTier] || OVERLAY_SIZES.lg;
  const isSoldOut = status.key === "soldout";
  const isCritical = status.key === "critical";
  const numberColor = status.key === "low" ? C.amber : isCritical ? C.coral : isSoldOut ? C.mint : C.textPrimary;

  return (
    <div
      className="inline-flex flex-col"
      style={{
        padding: s.pad,
        borderRadius: s.radius,
        background: "rgba(20, 19, 26, 0.55)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 12px 40px rgba(0,0,0,0.45), 0 0 40px ${status.dot}22`,
        minWidth: s.minW,
      }}
    >
      <div className="mb-2">
        <span className="dc-font-mono" style={{ fontSize: s.label, letterSpacing: "0.16em", color: C.textSecondary, fontWeight: 600 }}>
          BAGS LEFT
        </span>
      </div>
      <div className="flex items-baseline gap-1.5 mb-2.5">
        <AnimatedNumber
          value={bagsLeft}
          className={`dc-font-display${isCritical ? " dc-pulse" : ""}`}
          style={{ fontSize: s.num, fontWeight: 700, color: numberColor, lineHeight: 1, transition: "color 0.4s ease" }}
        />
        <span className="dc-font-display" style={{ fontSize: s.denom, color: C.textTertiary, fontWeight: 600 }}>/ {totalBags}</span>
      </div>
      <DripMeter value={bagsLeft} max={totalBags} height={s.meterH} status={status} />
    </div>
  );
}
