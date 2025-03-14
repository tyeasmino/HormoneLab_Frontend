/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#1E293B",
        "text-dark": "fff",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('daisyui'),
  ],
}

