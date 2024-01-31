const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        JJTheme: {
          primary: "#ab83d3",

          secondary: "#ef7f6e",

          accent: "#64308b",

          neutral: "#150e29",

          "base-100": "#1d2433",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },

  plugins: [daisyui],
};

module.exports = config;
