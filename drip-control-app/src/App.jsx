import { useState, useEffect, useRef, useCallback } from "react";
import { Package, MonitorPlay, Settings, Layers, Check } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import { useDripState } from "./hooks/useDripState";
import { C, getStatus } from "./lib/constants";
import logoWhite from "./assets/logo-white.png";
import SignInGate from "./components/SignInGate";
import TabButton from "./components/TabButton";
import TrackerView from "./components/TrackerView";
import OverlayTabView from "./components/OverlayTabView";
import SettingsView from "./components/SettingsView";
import Toast from "./components/Toast";

function FullScreenLoader({ label }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: C.ink }}>
      <div className="flex flex-col items-center gap-3">
        <div className="dc-spinner" />
        <p style={{ color: C.textTertiary, fontSize: 13 }}>{label}</p>
      </div>
    </div>
  );
}

export default function App() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { data, connected, update, resetAll } = useDripState();

  const [tab, setTab] = useState("tracker");
  const [manualValue, setManualValue] = useState("");
  const [newDropTotal, setNewDropTotal] = useState("50");
  const [priceInput, setPriceInput] = useState("20");
  const [backdropMode, setBackdropMode] = useState("stream");
  const [savedPulse, setSavedPulse] = useState(false);
  const [toast, setToast] = useState(null);
  const [simulateOffline, setSimulateOffline] = useState(false);

  const toastTimer = useRef(null);
  const savedPulseTimer = useRef(null);
  const prevUpdatedAtMs = useRef(null);
  const hasHydrated = useRef(false);

  const showToast = useCallback((msg, kind = "info") => {
    setToast({ msg, kind });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  // Flash "Saved" whenever a write is confirmed by Firestore — but never
  // on the very first snapshot, which is just existing data loading in,
  // not something we just saved.
  useEffect(() => {
    if (!data) return;
    const ts = data.updatedAt && typeof data.updatedAt.toMillis === "function" ? data.updatedAt.toMillis() : null;

    if (!hasHydrated.current) {
      hasHydrated.current = true;
      prevUpdatedAtMs.current = ts;
      return;
    }

    if (ts !== null && ts !== prevUpdatedAtMs.current) {
      prevUpdatedAtMs.current = ts;
      setSavedPulse(true);
      clearTimeout(savedPulseTimer.current);
      savedPulseTimer.current = setTimeout(() => setSavedPulse(false), 1400);
    }
  }, [data]);

  // Keep the settings inputs showing the live values.
  useEffect(() => {
    if (data) {
      setPriceInput(String(data.pricePerBag));
      setNewDropTotal(String(data.totalBags));
    }
  }, [data?.pricePerBag, data?.totalBags]);

  const updateBags = useCallback(
    (next) => {
      if (!data) return;
      if (next > data.totalBags) showToast(`Can't exceed ${data.totalBags} total bags`, "info");
      else if (next < 0) showToast("Bags left can't go below zero", "info");
      const clamped = Math.max(0, Math.min(data.totalBags, next));
      update({ bagsLeft: clamped }).catch(() => showToast("Couldn't save — check your connection", "error"));
    },
    [data, update, showToast]
  );

  const handleResetTo50 = () => {
    update({ totalBags: 50, bagsLeft: 50 }).catch(() => showToast("Couldn't save — check your connection", "error"));
    showToast("Reset to 50 bags", "success");
  };

  const handleStartNewDrop = () => {
    const n = parseInt(newDropTotal, 10);
    if (!Number.isFinite(n) || n <= 0) {
      showToast("Enter a total greater than zero", "error");
      return;
    }
    update({ totalBags: n, bagsLeft: n }).catch(() => showToast("Couldn't save — check your connection", "error"));
    showToast(`New drop started — ${n} bags`, "success");
  };

  const handleSavePrice = () => {
    const n = parseFloat(priceInput);
    if (!Number.isFinite(n) || n < 0) {
      showToast("Enter a valid price", "error");
      return;
    }
    update({ pricePerBag: n }).catch(() => showToast("Couldn't save — check your connection", "error"));
    showToast("Price per bag updated", "success");
  };

  const handleManualSet = (e) => {
    e.preventDefault();
    const n = parseInt(manualValue, 10);
    if (!Number.isFinite(n)) {
      showToast("Enter a number", "error");
      return;
    }
    updateBags(n);
    setManualValue("");
  };

  const handleResetAll = () => {
    resetAll().catch(() => showToast("Couldn't reset — check your connection", "error"));
    showToast("All data reset", "success");
  };

  if (authLoading) return <FullScreenLoader label="Loading Drip Control…" />;
  if (!user) return <SignInGate onSignIn={signIn} />;
  if (!data) return <FullScreenLoader label="Connecting to Firestore…" />;

  const status = getStatus(data.bagsLeft, data.totalBags);
  const currentValue = data.bagsLeft * data.pricePerBag;
  const totalValue = data.totalBags * data.pricePerBag;
  const sold = data.totalBags - data.bagsLeft;
  const lastUpdatedLabel =
    data.updatedAt && typeof data.updatedAt.toDate === "function"
      ? data.updatedAt.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "just now";
  const overlayUrl = `${window.location.origin}/overlay.html`;
  const showOffline = simulateOffline || !connected;

  return (
    <div className="min-h-screen w-full" style={{ background: `radial-gradient(140% 100% at 50% -10%, #1A1724 0%, ${C.ink} 55%)`, color: C.textPrimary, overflowX: "hidden" }}>
      <header className="w-full flex items-center justify-between flex-wrap" style={{ padding: "18px 20px", borderBottom: `1px solid ${C.hairline}`, gap: 10 }}>
        <div className="flex items-center gap-3">
          <img src={logoWhite} alt="DripTerps" style={{ height: 34, width: "auto", flexShrink: 0, filter: `drop-shadow(0 0 10px ${C.violet}55)` }} />
          <div>
            <p className="dc-font-display" style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.1 }}>Drip Control</p>
            <p style={{ fontSize: 11, color: C.textTertiary }}>DripTerps</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5" style={{ fontSize: 11, color: C.textTertiary }}>
            <Check size={12} aria-hidden={!savedPulse} style={{ opacity: savedPulse ? 1 : 0, transition: "opacity 0.3s", color: C.mint }} />
            <span aria-hidden={!savedPulse} style={{ opacity: savedPulse ? 1 : 0, transition: "opacity 0.3s" }}>Saved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="dc-dot" style={{ background: showOffline ? C.coral : C.mint, boxShadow: showOffline ? "none" : `0 0 10px ${C.mint}` }} />
            <span className="dc-font-mono" style={{ fontSize: 11, color: C.textSecondary }}>{showOffline ? "Reconnecting…" : "Live"}</span>
          </div>
        </div>
      </header>

      <div className="flex items-center gap-2 dc-hide-scroll" style={{ padding: "14px 20px 0", overflowX: "auto" }}>
        <TabButton active={tab === "tracker"} onClick={() => setTab("tracker")} icon={<Package size={14} />} label="Bags Tracker" />
        <TabButton active={tab === "overlay"} onClick={() => setTab("overlay")} icon={<MonitorPlay size={14} />} label="Overlay" />
        <TabButton active={tab === "settings"} onClick={() => setTab("settings")} icon={<Settings size={14} />} label="Settings" />
        <div className="flex items-center gap-1.5 dc-font-mono" style={{ fontSize: 10, color: C.textTertiary, border: `1px dashed ${C.hairline}`, borderRadius: 999, padding: "7px 12px", marginLeft: 2, whiteSpace: "nowrap" }}>
          <Layers size={12} /> More modules soon
        </div>
      </div>

      <main style={{ padding: 20, maxWidth: 1180, margin: "0 auto" }}>
        {tab === "tracker" && (
          <TrackerView
            bagsLeft={data.bagsLeft}
            totalBags={data.totalBags}
            pricePerBag={data.pricePerBag}
            status={status}
            currentValue={currentValue}
            totalValue={totalValue}
            sold={sold}
            onMinus={() => updateBags(data.bagsLeft - 1)}
            onPlus={() => updateBags(data.bagsLeft + 1)}
            onAdd5={() => updateBags(data.bagsLeft + 5)}
            onRemove5={() => updateBags(data.bagsLeft - 5)}
            onReset={handleResetTo50}
            manualValue={manualValue}
            setManualValue={setManualValue}
            onManualSet={handleManualSet}
            lastUpdated={lastUpdatedLabel}
          />
        )}
        {tab === "overlay" && (
          <OverlayTabView
            bagsLeft={data.bagsLeft}
            totalBags={data.totalBags}
            overlayPosition={data.overlayPosition}
            setOverlayPosition={(pos) => update({ overlayPosition: pos }).catch(() => showToast("Couldn't save — check your connection", "error"))}
            backdropMode={backdropMode}
            setBackdropMode={setBackdropMode}
            overlaySize={data.overlaySize}
            setOverlaySize={(size) => update({ overlaySize: size }).catch(() => showToast("Couldn't save — check your connection", "error"))}
            overlayUrl={overlayUrl}
          />
        )}
        {tab === "settings" && (
          <SettingsView
            priceInput={priceInput}
            setPriceInput={setPriceInput}
            onSavePrice={handleSavePrice}
            newDropTotal={newDropTotal}
            setNewDropTotal={setNewDropTotal}
            onStartNewDrop={handleStartNewDrop}
            simulateOffline={simulateOffline}
            setSimulateOffline={setSimulateOffline}
            onResetAll={handleResetAll}
            userEmail={user.email}
            onSignOut={signOut}
          />
        )}
      </main>

      {toast && <Toast toast={toast} />}
    </div>
  );
}
