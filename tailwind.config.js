/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'threads-black': '#101010',
        'threads-white': '#f3f5f7'
      }
    }
  },
  plugins: []
}
