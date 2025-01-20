/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      center: true,
      // screens: {
      //   "2xl": "1280px",
      // },
    },
    extend: {
      colors: {
        "navbar-bg": "#F3F4F6",
        "main-bg": "rgb(10,173,10)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
