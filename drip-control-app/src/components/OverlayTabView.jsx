import { Copy } from "lucide-react";
import { C, cardStyle, eyebrowStyle, dcCheckerBg } from "../lib/constants";
import SegButton from "./SegButton";
import OverlayWidget from "./OverlayWidget";

const positions = [
  { key: "top-left", label: "Top left" },
  { key: "top-right", label: "Top right" },
  { key: "bottom-left", label: "Bottom left" },
  { key: "bottom-right", label: "Bottom right" },
];
const posStyleMap = {
  "top-left": { top: 20, left: 20 },
  "top-right": { top: 20, right: 20 },
  "bottom-left": { bottom: 20, left: 20 },
  "bottom-right": { bottom: 20, right: 20 },
};

export default function OverlayTabView({
  bagsLeft, totalBags,
  overlayPosition, setOverlayPosition,
  backdropMode, setBackdropMode,
  overlaySize, setOverlaySize,
  overlayUrl,
}) {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(overlayUrl);
    } catch (e) {
      // clipboard API can fail on non-HTTPS/local contexts — that's fine,
      // the link is still shown and selectable in the input.
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 dc-fade-in">
      <div className="lg:col-span-2 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 self-start flex-wrap">
          <SegButton active={backdropMode === "stream"} onClick={() => setBackdropMode("stream")}>Stream preview</SegButton>
          <SegButton active={backdropMode === "transparent"} onClick={() => setBackdropMode("transparent")}>Transparency check</SegButton>
        </div>
        <div
          style={{
            position: "relative", width: "100%", maxWidth: 300, aspectRatio: "9/16", borderRadius: 28, overflow: "hidden", border: `1px solid ${C.hairline}`,
            background: backdropMode === "transparent" ? dcCheckerBg : `radial-gradient(80% 60% at 30% 15%, ${C.violet}30, transparent 55%), radial-gradient(70% 50% at 80% 85%, ${C.mint}20, transparent 55%), linear-gradient(180deg, #17141F, #0B0A0F)`,
            boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ position: "absolute", maxWidth: "calc(100% - 40px)", ...(posStyleMap[overlayPosition] || posStyleMap["bottom-left"]) }}>
            <OverlayWidget bagsLeft={bagsLeft} totalBags={totalBags} variant="full" sizeTier={overlaySize} />
          </div>
        </div>
        <p style={{ fontSize: 11.5, color: C.textTertiary, textAlign: "center", maxWidth: 320 }}>
          The checkerboard shows exactly what's transparent — that area will show your live camera feed in TikTok LIVE Studio.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div style={cardStyle}>
          <p className="dc-font-mono" style={eyebrowStyle}>OVERLAY POSITION</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {positions.map((p) => (
              <button
                key={p.key}
                onClick={() => setOverlayPosition(p.key)}
                className="dc-hoverable"
                style={{
                  padding: "10px 8px", borderRadius: 12, fontSize: 12.5, fontWeight: 600,
                  background: overlayPosition === p.key ? C.panelRaised2 : C.panelRaised,
                  border: `1px solid ${overlayPosition === p.key ? C.violet + "88" : C.hairline}`,
                  color: overlayPosition === p.key ? C.textPrimary : C.textSecondary, cursor: "pointer", transition: "all 0.15s ease",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <p className="dc-font-mono" style={eyebrowStyle}>OVERLAY SIZE</p>
          <p style={{ fontSize: 12, color: C.textTertiary, marginTop: 6, marginBottom: 12 }}>Bigger reads better on stream. This changes what viewers actually see.</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: "md", label: "Standard" },
              { key: "lg", label: "Large" },
              { key: "xl", label: "Extra large" },
            ].map((o) => (
              <button
                key={o.key}
                onClick={() => setOverlaySize(o.key)}
                className="dc-hoverable"
                style={{
                  padding: "10px 6px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                  background: overlaySize === o.key ? C.panelRaised2 : C.panelRaised,
                  border: `1px solid ${overlaySize === o.key ? C.violet + "88" : C.hairline}`,
                  color: overlaySize === o.key ? C.textPrimary : C.textSecondary, cursor: "pointer", transition: "all 0.15s ease",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <p className="dc-font-mono" style={eyebrowStyle}>LINK SOURCE URL</p>
          <div className="flex items-center gap-2 mt-3">
            <input readOnly value={overlayUrl} onFocus={(e) => e.target.select()} aria-label="Overlay Link Source URL" style={{ flex: 1, minWidth: 0, background: C.panelRaised, border: `1px solid ${C.hairline}`, borderRadius: 10, padding: "9px 12px", fontSize: 12, color: C.textPrimary }} />
            <button onClick={copyLink} aria-label="Copy overlay link" className="dc-hoverable" style={{ padding: "9px 10px", borderRadius: 10, background: C.panelRaised, border: `1px solid ${C.hairline}`, color: C.textPrimary, cursor: "pointer", flexShrink: 0 }}>
              <Copy size={14} />
            </button>
          </div>
          <p style={{ fontSize: 11.5, color: C.textTertiary, marginTop: 8, lineHeight: 1.5 }}>
            Paste this link into a Link Source in TikTok LIVE Studio. It updates in real time — no need to touch it again after that.
          </p>
        </div>
      </div>
    </div>
  );
}
