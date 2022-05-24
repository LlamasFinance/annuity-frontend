module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "Nunito Sans": [ "Nunito Sans", 'sans-serif'],
        'Rubik': [ 'Rubik', 'sans-serif'],
        'Poppins': [ 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}
