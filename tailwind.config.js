/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E4036',
        accent:  '#CC5833',
        cream:   '#F2F0E9',
        dark:    '#1A1A1A',
      },
      fontFamily: {
        sans:  ["'Plus Jakarta Sans'", 'sans-serif'],
        serif: ["'Cormorant Garamond'", 'serif'],
        mono:  ["'IBM Plex Mono'", 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
