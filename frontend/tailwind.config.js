/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f8ff",
        button: "#FD5C42",
        icons: "#D8A9DB",
        socials: "#D8A9DB",
        footer: "#272A2D",
      },
      backgroundImage: {
        'shapes-pattern': "url('/src/assets/images/Shapes.png')",
      },
    },
  },
  plugins: [],
}