import { Component } from "react";
import { C } from "../lib/constants";

// React error boundaries currently require a class component — there's no
// hook equivalent. `silent` renders nothing on crash instead of a message,
// which is what we want for the overlay: a visible error box over a live
// camera feed looks far worse to viewers than the counter just disappearing.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Drip Control crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.silent) return null;
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: C.ink,
            color: C.textSecondary,
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ color: C.textPrimary, fontWeight: 600, marginBottom: 6 }}>Something went wrong.</p>
            <p style={{ fontSize: 13 }}>Reload the page. If it keeps happening, check the browser console for details.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
