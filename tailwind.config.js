/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        changa: ['Changa', 'familycairo'],
        outfit: ['Outfit', 'familycairo'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
