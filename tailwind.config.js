/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        charcoal: "#0f0f10",
        smoke: "#1a1a1c",
        silver: "#b5b5b5",
        accent: "#6bf2ff",
      },
      backgroundImage: {
        "lens-glow": "radial-gradient(circle at 20% 20%, rgba(107, 242, 255, 0.35), rgba(15, 15, 16, 0.95))",
        "fog-overlay": "linear-gradient(135deg, rgba(26, 26, 28, 0.95), rgba(15, 15, 16, 0.8))",
      },
      boxShadow: {
        glow: "0 0 40px rgba(107, 242, 255, 0.25)",
        glass: "0 20px 45px rgba(0, 0, 0, 0.35)",
      },
      animation: {
        "slow-pulse": "slowPulse 12s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "fog-move": "fogMove 30s linear infinite",
      },
      keyframes: {
        slowPulse: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fogMove: {
          "0%": { transform: "translate3d(-50px, 0, 0)" },
          "50%": { transform: "translate3d(50px, 0, 0)" },
          "100%": { transform: "translate3d(-50px, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};

