/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        '600px': '600px',
        '1200px': '1200px',
      },
    },
  },
  plugins: [],
}

