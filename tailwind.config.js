/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0fbd83",
          secondary: "#ffedd5",
          accent: "#f6f8ff",
          neutral: "#9ca3af",
          "base-100": "#ffffff",
          info: "#98A8DD",
          success: "#10B981",
          warning: "#ff8b2c",
          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
