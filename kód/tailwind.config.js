/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1c1b19',
        cream: '#f4efe7',
        tomato: '#e24d31',
        mustard: '#e5ae41',
        moss: '#5d6b4b',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(28, 27, 25, 0.08)',
      },
    },
  },
  plugins: [],
}
