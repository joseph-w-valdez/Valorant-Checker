/** @type {import('tailwindcss').Config} */
module.exports = {
  ignoreFiles: ['./public/output.css'],
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        '375': '375px', // Custom breakpoint for 375px width
      },
    },
  },
  plugins: [],
}
