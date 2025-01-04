/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'stripes-light': 'linear-gradient(45deg, rgba(200, 200, 200, 0.1) 25%, transparent 25%, transparent 50%, rgba(200, 200, 200, 0.1) 50%, rgba(200, 200, 200, 0.1) 75%, transparent 75%)',
        'stripes-dark': 'linear-gradient(45deg, rgba(50, 50, 50, 0.1) 25%, transparent 25%, transparent 50%, rgba(50, 50, 50, 0.1) 50%, rgba(50, 50, 50, 0.1) 75%, transparent 75%)',
      },
      backgroundSize: {
        'stripes': '10px 10px',
      }
    },
  },
  plugins: [],
}