export const C = {
  ink: "#0A0A0D",
  inkSoft: "#111017",
  panel: "#16151C",
  panelRaised: "#1E1D26",
  panelRaised2: "#252430",
  hairline: "#2A2933",
  textPrimary: "#F6F5F9",
  textSecondary: "#9C99AA",
  textTertiary: "#6B6876",
  violet: "#8B6BFF",
  violetDeep: "#5B3FD9",
  mint: "#33E6A8",
  amber: "#FFB84D",
  coral: "#FF5C7A",
};

export const cardStyle = { background: C.panel, border: `1px solid ${C.hairline}`, borderRadius: 20, padding: 22 };
export const eyebrowStyle = { fontSize: 10.5, letterSpacing: "0.12em", color: C.textTertiary, fontWeight: 600 };
export const dcCheckerBg = "repeating-conic-gradient(#221F2B 0% 25%, #141319 0% 50%) 0 0/24px 24px";

export const OVERLAY_SIZES = {
  md: { pad: "20px 26px", radius: 26, label: 13, num: 50, denom: 24, meterH: 14, minW: 225 },
  lg: { pad: "24px 30px", radius: 28, label: 15, num: 60, denom: 27, meterH: 17, minW: 245 },
  xl: { pad: "26px 32px", radius: 30, label: 16, num: 68, denom: 30, meterH: 19, minW: 255 },
};
export const MINI_SIZE = { pad: "14px 18px", radius: 28, label: 10, num: 30, denom: 16, meterH: 8, minW: 200 };

export function getStatus(bagsLeft, total) {
  const ratio = total > 0 ? bagsLeft / total : 0;
  if (bagsLeft <= 0) {
    return { key: "soldout", badge: "SOLD OUT", gradient: `linear-gradient(90deg, ${C.mint}, ${C.violet})`, dot: C.mint };
  }
  if (bagsLeft <= 10) {
    return { key: "critical", badge: "ALMOST GONE", gradient: `linear-gradient(90deg, ${C.coral}, ${C.amber})`, dot: C.coral };
  }
  if (ratio <= 0.4) {
    return { key: "low", badge: "LOW STOCK", gradient: `linear-gradient(90deg, ${C.violet}, ${C.amber})`, dot: C.amber };
  }
  return { key: "healthy", badge: null, gradient: `linear-gradient(90deg, ${C.violet}, ${C.mint})`, dot: C.mint };
}

export const fmtMoney = (n) => `$${Math.round(n).toLocaleString("en-US")}`;

export const DEFAULT_STATE = {
  bagsLeft: 50,
  totalBags: 50,
  pricePerBag: 20,
  overlayPosition: "bottom-left",
  overlaySize: "lg",
  overlayOpacity: 0.55,
};
