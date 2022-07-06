/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineClamp: {
        8: "8",
      },
      colors: {
        blue: "#1565c0",
        blueDark: "#0e4686",
        green: "#43a047",
        greenDark: "#2e7031",
        red: "#e53935",
        redDark: "#a02725",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
