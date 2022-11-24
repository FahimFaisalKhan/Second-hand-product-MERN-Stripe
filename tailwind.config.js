/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        doctortheme: {
          primary: "#0d47a1",
          secondary: "#42a5f5",
          warning: "#00296b",
          accent: "#64b5f6",
          neutral: "#90caf9",
          info: "#bbdefb",
          success: "#E3F2FD",
          "base-100": "#FFFFFF",
          "base-content": "#020202",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
