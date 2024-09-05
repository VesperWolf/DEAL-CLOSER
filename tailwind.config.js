/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Adjust the paths according to your project structure
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8f9fa', // Define your custom background color
        border: '#dee2e6', // Define your custom border color
        foreground: '#333333', // Define your custom foreground color
      },
    },
  },
  plugins: [],
}

