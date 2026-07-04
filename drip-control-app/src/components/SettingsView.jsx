import { C, cardStyle, eyebrowStyle } from "../lib/constants";
import ToggleRow from "./ToggleRow";

export default function SettingsView({
  priceInput, setPriceInput, onSavePrice,
  newDropTotal, setNewDropTotal, onStartNewDrop,
  simulateOffline, setSimulateOffline,
  onResetAll,
  userEmail, onSignOut,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 dc-fade-in" style={{ maxWidth: 820 }}>
      <div style={cardStyle}>
        <p className="dc-font-mono" style={eyebrowStyle}>PRICE PER BAG</p>
        <p style={{ fontSize: 12, color: C.textTertiary, marginTop: 6, marginBottom: 12 }}>Used to calculate current and total value.</p>
        <div className="flex items-center gap-2">
          <input value={priceInput} onChange={(e) => setPriceInput(e.target.value)} inputMode="decimal" aria-label="Price per bag in dollars" style={{ flex: 1, minWidth: 0, background: C.panelRaised, border: `1px solid ${C.hairline}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, color: C.textPrimary }} />
          <button onClick={onSavePrice} className="dc-btn-primary" style={{ padding: "10px 16px", borderRadius: 10, fontSize: 13, flexShrink: 0 }}>Save</button>
        </div>
      </div>

      <div style={cardStyle}>
        <p className="dc-font-mono" style={eyebrowStyle}>START A NEW DROP</p>
        <p style={{ fontSize: 12, color: C.textTertiary, marginTop: 6, marginBottom: 12 }}>Sets a new total and resets bags left to match.</p>
        <div className="flex items-center gap-2">
          <input value={newDropTotal} onChange={(e) => setNewDropTotal(e.target.value)} inputMode="numeric" aria-label="Total bags for new drop" style={{ flex: 1, minWidth: 0, background: C.panelRaised, border: `1px solid ${C.hairline}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, color: C.textPrimary }} />
          <button onClick={onStartNewDrop} className="dc-btn-primary" style={{ padding: "10px 16px", borderRadius: 10, fontSize: 13, flexShrink: 0 }}>Start drop</button>
        </div>
      </div>

      <div style={cardStyle}>
        <p className="dc-font-mono" style={eyebrowStyle}>CONNECTION PREVIEW</p>
        <p style={{ fontSize: 12, color: C.textTertiary, marginTop: 6, marginBottom: 12 }}>Preview the offline state. This doesn't affect your saved data.</p>
        <ToggleRow label={simulateOffline ? "Showing offline state" : "Showing live state"} checked={simulateOffline} onChange={setSimulateOffline} />
      </div>

      <div style={cardStyle}>
        <p className="dc-font-mono" style={eyebrowStyle}>ACCOUNT</p>
        <p style={{ fontSize: 12, color: C.textTertiary, marginTop: 6, marginBottom: 12, wordBreak: "break-all" }}>Signed in as {userEmail}</p>
        <button onClick={onSignOut} className="dc-hoverable" style={{ padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, background: C.panelRaised, border: `1px solid ${C.hairline}`, color: C.textPrimary, cursor: "pointer" }}>
          Sign out
        </button>
      </div>

      <div className="lg:col-span-2" style={{ ...cardStyle, border: `1px solid ${C.coral}55` }}>
        <p className="dc-font-mono" style={{ ...eyebrowStyle, color: C.coral }}>DANGER ZONE</p>
        <p style={{ fontSize: 12, color: C.textTertiary, marginTop: 6, marginBottom: 12 }}>Clears the bag count, price, and layout for everyone watching — can't be undone.</p>
        <button onClick={onResetAll} style={{ padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, background: "transparent", border: `1px solid ${C.coral}66`, color: C.coral, cursor: "pointer" }}>
          Reset all data
        </button>
      </div>
    </div>
  );
}
