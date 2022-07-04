/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineClamp: {
        8: "8",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
