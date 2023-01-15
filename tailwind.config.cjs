/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // boxShadow: {
      //   xxx: "0 35px 70px -15px rgba(0, 0, 0, 0.9)",
      // },
      colors: {
        primary: "#f7b2ad",
        secondary: "#38618c",
        redish: "#ed4040",
        brownish: "#2a2727",
      },
      fontFamily: {
        chillax: ["Chillax", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
