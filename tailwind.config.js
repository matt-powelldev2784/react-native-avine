/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '321px',
        sm: '380px',
        md: '600px',
        lg: '1100px',
      },
      colors: {
        primaryBlue: '#337bae',
      },
    },
  },
  plugins: [],
}
