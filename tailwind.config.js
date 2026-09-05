/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030E09", // Deep dark background from brand system
        surface: {
          dark: "#030E09",
          "dark-card": "#071A11",
          "dark-section": "#0A2117",
          light: "#F5FAF7",
          "light-card": "#FFFFFF",
          "light-section": "#EDFAF2",
        },
        primary: {
          DEFAULT: "#006B54", // Forest Teal from logo
          deep: "#004D3D",
          light: "#008567",
          ghost: "rgba(0, 107, 84, 0.10)",
        },
        accent: {
          DEFAULT: "#3CBF00", // Lime Green from logo
          vivid: "#4ED100",
          soft: "#C6F088",
          ghost: "rgba(60, 191, 0, 0.12)",
        },
        cyan: {
          DEFAULT: "#3CBF00", // Mapped to brand lime green for backwards compatibility
          glow: "rgba(60, 191, 0, 0.25)",
          50: "#f4fdf0",
          100: "#e5fbdc",
          200: "#c6f088",
          300: "#9ee647",
          400: "#4ED100",
          500: "#3CBF00",
          600: "#2FAD00",
          700: "#248a00",
          800: "#1d6c00",
          900: "#175505",
          950: "#061a00",
        },
        purple: {
          DEFAULT: "#006B54", // Forest teal
          glow: "rgba(0, 107, 84, 0.3)",
          50: "#f0fdf9",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#008567",
          600: "#006B54",
          700: "#004D3D",
          800: "#00382d",
          900: "#00241d",
          950: "#001410",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 229, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
