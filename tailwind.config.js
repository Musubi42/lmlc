/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0000ff',
        'lilas-pop': '#974dff',
        'rose-neon': '#ff0066',
        'bleu-ciel': '#99deff',
        'jaune-citron': '#ffff00',
      },
      fontFamily: {
        montserrat: ["Montserrat", "Arial", "sans-serif"]
      },
    },
  },
  plugins: [],
}

