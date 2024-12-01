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
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        slideUp: 'slideUp 0.5s ease-out',
        slideDown: 'slideDown 0.5s ease-out',
        slideLeft: 'slideLeft 0.5s ease-out',
        slideRight: 'slideRight 0.5s ease-out',
      },
      maxHeight: {
        'custom': '100px',
      },
    },
  },
  plugins: [],
};