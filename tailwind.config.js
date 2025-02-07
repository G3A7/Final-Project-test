/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/dist/flowbite.min.js",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        "navbar-bg": "#f0f3f2",
      },
      animation: {
        custom_animate: "move_cart 0.9s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
};

/*
 --main-color:#0aad0a;
    --light-color:#f0f3f2;
    --shadow: rgba(145,158,171,.2) 0px 2px 4px -1px,rgba(145,158,171,.14) 0px 4px 5px 0px,rgba(145,158,171,.12) 0px 1px 10px 0px;
    --font-family:'Encode Sans Expanded', sans-serif;
    --rating-color:#ffc908;
*/
