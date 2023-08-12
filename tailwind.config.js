/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'threads-black': '#101010',
        'threads-white': '#f3f5f7',
        'threads-light-gray': '#777777',
        'threads-dark-gray': '#1e1e1e'
      }
    }
  },
  plugins: []
}
