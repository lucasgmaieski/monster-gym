import { colors, fontFamily } from "./src/styles/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}", "App.tsx"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors,
        fontFamily,
      },
    },
    plugins: [],
  }