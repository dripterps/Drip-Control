import { Minus, Plus, RotateCcw, DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import { C, cardStyle, eyebrowStyle, fmtMoney } from "../lib/constants";
import AnimatedNumber from "./AnimatedNumber";
import DripMeter from "./DripMeter";
import RoundButton from "./RoundButton";
import ChipButton from "./ChipButton";
import StatCard from "./StatCard";
import BackdropDecor from "./BackdropDecor";
import OverlayWidget from "./OverlayWidget";

export default function TrackerView({
  bagsLeft, totalBags, pricePerBag, status, currentValue, totalValue, sold,
  onMinus, onPlus, onAdd5, onRemove5, onReset,
  manualValue, setManualValue, onManualSet, lastUpdated,
}) {
  const atMin = bagsLeft <= 0;
  const atMax = bagsLeft >= totalBags;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 dc-fade-in">
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div style={cardStyle}>
          <div className="flex items-center justify-between mb-1" style={{ gap: 12 }}>
            <span className="dc-font-mono" style={eyebrowStyle}>BAGS LEFT TRACKER · MODULE 01</span>
            {status.badge && (
              <span className="dc-font-mono dc-pulse" style={{ color: status.dot, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                ● {status.badge}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2 my-3 flex-wrap">
            <AnimatedNumber value={bagsLeft} className="dc-font-display" style={{ fontSize: 60, fontWeight: 700, lineHeight: 1, color: C.textPrimary }} />
            <span className="dc-font-display" style={{ fontSize: 26, color: C.textTertiary, fontWeight: 600 }}>/ {totalBags} left</span>
          </div>
          <DripMeter value={bagsLeft} max={totalBags} height={26} status={status} />
          <p style={{ marginTop: 14, fontSize: 12, color: C.textTertiary }}>Updated {lastUpdated}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard icon={<DollarSign size={14} />} label="Current value" value={currentValue} prefix="$" />
          <StatCard icon={<TrendingUp size={14} />} label="Total value" value={totalValue} prefix="$" />
          <StatCard icon={<ShoppingBag size={14} />} label="Sold" value={sold} subtext={`${fmtMoney(sold * pricePerBag)} earned`} />
        </div>

        <div style={cardStyle}>
          <p className="dc-font-mono" style={eyebrowStyle}>ADJUST COUNT</p>
          <div className="flex items-center justify-center gap-4 my-4 flex-wrap">
            <RoundButton onClick={onMinus} disabled={atMin} tone="minus" ariaLabel="Remove 1 bag"><Minus size={30} /></RoundButton>
            <form onSubmit={onManualSet} className="flex flex-col items-center">
              <input
                value={manualValue}
                onChange={(e) => setManualValue(e.target.value)}
                placeholder={String(bagsLeft)}
                inputMode="numeric"
                aria-label="Set exact bags left"
                className="text-center"
                style={{ width: 84, background: C.panelRaised, border: `1px solid ${C.hairline}`, borderRadius: 12, padding: "10px 0", fontSize: 20, fontWeight: 700, color: C.textPrimary }}
              />
              <button type="submit" style={{ fontSize: 11, color: C.violet, marginTop: 6, background: "none", border: "none", cursor: "pointer" }}>Set value</button>
            </form>
            <RoundButton onClick={onPlus} disabled={atMax} tone="plus" ariaLabel="Add 1 bag"><Plus size={30} /></RoundButton>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <ChipButton onClick={onRemove5} disabled={atMin}>−5</ChipButton>
            <ChipButton onClick={onAdd5} disabled={atMax}>+5</ChipButton>
            <ChipButton onClick={onReset} icon={<RotateCcw size={13} />}>Reset to 50</ChipButton>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="dc-font-mono" style={{ ...eyebrowStyle, paddingLeft: 2 }}>WHAT VIEWERS SEE</p>
        <div style={{ ...cardStyle, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 220, background: C.inkSoft, position: "relative", overflow: "hidden" }}>
          <BackdropDecor />
          <div style={{ position: "relative", zIndex: 1 }}>
            <OverlayWidget bagsLeft={bagsLeft} totalBags={totalBags} variant="mini" />
          </div>
        </div>
        <p style={{ fontSize: 12, color: C.textTertiary, lineHeight: 1.5 }}>
          This mirrors your live overlay instantly, over the internet via Firestore — no refresh needed on either screen. Open the Overlay tab for the full-size preview and position controls.
        </p>
      </div>
    </div>
  );
}
