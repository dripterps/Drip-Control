import { useDripState } from "./hooks/useDripState";
import OverlayWidget from "./components/OverlayWidget";

const posStyleMap = {
  "top-left": { top: 20, left: 20 },
  "top-right": { top: 20, right: 20 },
  "bottom-left": { bottom: 20, left: 20 },
  "bottom-right": { bottom: 20, right: 20 },
};

// This is the page you paste into TikTok LIVE Studio's Link Source. No
// password gate, no chrome — just the widget on a fully transparent
// background, reading live from Firestore.
export default function OverlayApp() {
  const { data } = useDripState();

  if (!data) return null;

  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, background: "transparent" }}>
      <div style={{ position: "absolute", maxWidth: "calc(100% - 40px)", ...(posStyleMap[data.overlayPosition] || posStyleMap["bottom-left"]) }}>
        <OverlayWidget bagsLeft={data.bagsLeft} totalBags={data.totalBags} variant="full" sizeTier={data.overlaySize} />
      </div>
    </div>
  );
}
