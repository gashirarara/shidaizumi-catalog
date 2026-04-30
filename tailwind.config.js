/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a2744',
        accent: '#c9a84c',
        bg: '#faf8f4',
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Noto Sans JP"', 'Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
