/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", , "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        exo: ["Exo_400Regular"],
        "exo-bold": ["Exo_700Bold"],
        fredoka: ["Fredoka_400Regular"],
        quicksand: ["Quicksand_400Regular"],
      },
    },
  },
  plugins: [],
};
