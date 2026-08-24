/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './{components,pages,lib}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { gvl: { black: '#111111', yellow: '#DFFF00', blue: '#1E90FF', green: '#32CD32', cream: '#FDFBF7', orange: '#ff002b' }, cf: { primary: '#4C516D', accent: '#00B577', accent2: '#005FC5', bgSec: '#f8fafc' } },
      fontFamily: { sans: ['Neue Machina', 'Space Grotesk', 'system-ui', 'sans-serif'], montserrat: ['Montserrat', 'sans-serif'], pixel: ['pf-pixelscript', 'monospace'] },
      animation: { scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite' },
      keyframes: { scroll: { to: { transform: 'translate(calc(-50% - 0.5rem))' } } },
    },
  },
  plugins: [],
};
