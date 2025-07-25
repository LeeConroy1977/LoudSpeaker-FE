/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Merriweather", "sans-serif"],
        lobster: ["Lobster", "sans-serif"],
      },
      colors: {
        primary: "#456990",
        darkTextPrimary: "#D1D5DB",
        darkBg: "#0e0e0e",
        secondaryBg: "#1f2937",
      },
    },
    screens: {
      mobile: { max: "639px" },
      "tablet-portrait": "640px",
      tablet: "900px",
      laptop: "1024px",
      desktop: "1600px",
      "xl-screen": "1920px",
    },
  },

  plugins: [],
};
