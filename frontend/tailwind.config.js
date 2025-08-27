/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        background: '#0a0a0a',
        card: '#1a1a1a',
        accent: '#00ff99',
        text: '#e0e0e0',
      },
    },
  },
  plugins: [],
}

