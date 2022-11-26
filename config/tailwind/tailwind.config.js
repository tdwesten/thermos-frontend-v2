const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{hbs,ts,js,yaml}",
    "./translations/**/*.{hbs,ts,js,yaml}",
    "./app/index.html",
    "./app/game/controller.ts",
  ],
  // safelist: [
  //   // {
  //   //   // pattern: /^bg-/,
  //   // },
  // ],
  theme: {
    fontFamily: {
      display: ["Fira Code"],
      body: ["Fira Code", "monospace"],
    },
  },
};
