/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./blocks/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "footer-job": "url('/assets/images/footer-job.png')",
        "footer-tuned": "url('/assets/images/footer-tuned.png')",
        "footer-questions": "url('/assets/images/footer-questions.png')",
      },
      colors: {
        primary: "#0000ff",
        "lilas-pop": "#974dff",
        "rose-neon": "#ff0066",
        "bleu-ciel": "#99deff",
        "jaune-citron": "#ffff00",
      },
      fontFamily: {
        montserrat: ["Montserrat", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
