/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./overlay.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0D",
        "ink-soft": "#111017",
        panel: "#16151C",
        "panel-raised": "#1E1D26",
        "panel-raised-2": "#252430",
        hairline: "#2A2933",
        "text-primary": "#F6F5F9",
        "text-secondary": "#9C99AA",
        "text-tertiary": "#6B6876",
        violet: "#8B6BFF",
        "violet-deep": "#5B3FD9",
        mint: "#33E6A8",
        amber: "#FFB84D",
        coral: "#FF5C7A",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
