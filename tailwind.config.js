/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwindcss-font-inter")],
  daisyui: {
    themes: ["dark"],
  },
  theme: {
    extend: {
      colors: {
        "custom-red": "#CD0100",
      },
    },
  },
};
