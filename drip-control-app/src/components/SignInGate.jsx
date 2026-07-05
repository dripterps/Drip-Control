import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { C } from "../lib/constants";
import logoWhite from "../assets/logo-white.png";

function mapAuthError(err) {
  const code = err && err.code ? err.code : "";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) {
    return "That email or password isn't right. Try again.";
  }
  if (code.includes("too-many-requests")) {
    return "Too many attempts — wait a moment and try again.";
  }
  if (code.includes("network-request-failed")) {
    return "Couldn't reach Firebase — check your connection.";
  }
  return "Couldn't sign in. Check your details and try again.";
}

// Real authentication via Firebase Auth (email + password), replacing the
// prototype's hardcoded password. Create your one admin account in the
// Firebase console under Authentication -> Users -> Add user — see
// README.md for the exact steps.
export default function SignInGate({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await onSignIn(email.trim(), pwd);
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6" style={{ background: `radial-gradient(120% 120% at 50% -10%, #1A1824 0%, ${C.ink} 60%)` }}>
      <form onSubmit={submit} className="w-full max-w-sm dc-fade-in" style={{ background: C.panel, border: `1px solid ${C.hairline}`, borderRadius: 24, padding: "36px 32px" }}>
        <div className="flex items-center justify-center mb-5">
          <img src={logoWhite} alt="DripTerps" style={{ height: 80, width: "auto", filter: `drop-shadow(0 0 24px ${C.violet}66)` }} />
        </div>
        <h1 className="dc-font-display text-center" style={{ fontSize: 22, fontWeight: 700, color: C.textPrimary }}>Drip Control</h1>
        <p className="text-center mb-6" style={{ fontSize: 13, color: C.textSecondary, marginTop: 4 }}>DripTerps · Streaming Control Center</p>

        <label htmlFor="dc-email" className="block dc-font-mono mb-2" style={{ fontSize: 10, letterSpacing: "0.1em", color: C.textTertiary }}>EMAIL</label>
        <input
          id="dc-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="w-full outline-none mb-4"
          style={{ background: C.panelRaised, border: `1px solid ${C.hairline}`, borderRadius: 12, padding: "12px 14px", color: C.textPrimary, fontSize: 14 }}
        />

        <label htmlFor="dc-password" className="flex items-center gap-1.5 dc-font-mono mb-2" style={{ fontSize: 10, letterSpacing: "0.1em", color: C.textTertiary }}>
          <Lock size={11} /> PASSWORD
        </label>
        <div className="relative mb-2">
          <input
            id="dc-password"
            type={show ? "text" : "password"}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="w-full outline-none"
            style={{ background: C.panelRaised, border: `1px solid ${error ? C.coral : C.hairline}`, borderRadius: 12, padding: "12px 44px 12px 14px", color: C.textPrimary, fontSize: 14 }}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute"
            style={{ right: 12, top: "50%", transform: "translateY(-50%)", color: C.textTertiary, background: "none", border: "none", cursor: "pointer" }}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && <p style={{ color: C.coral, fontSize: 12, marginBottom: 8 }}>{error}</p>}

        <button type="submit" disabled={busy} className="w-full dc-btn-primary mt-3" style={{ padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 600 }}>
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-center mt-5" style={{ fontSize: 11, color: C.textTertiary, lineHeight: 1.5 }}>
          No account yet? Create one for yourself in the Firebase console under Authentication → Users. See README.md.
        </p>
      </form>
    </div>
  );
}
