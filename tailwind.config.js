/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000B18", // Darker Space Blue
        primary: {
          DEFAULT: "#001F3F",
          light: "#002F5F",
        },
        cyan: {
          DEFAULT: "#00E5FF",
          glow: "rgba(0, 229, 255, 0.3)",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          glow: "rgba(139, 92, 246, 0.3)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
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
