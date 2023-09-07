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
    },
    animation: {
      fadeIn: 'fadeIn 0.3s ease-in-out forwards',
      fadeOut: 'fadeOut 0.3s ease-in-out forwards'
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, display: 'none' },
        '100%': { opacity: 1, display: 'flex' }
      },
      fadeOut: {
        '0%': { opacity: 1, display: 'flex' },
        '100%': { opacity: 0, display: 'none' }
      }
    }
  },
  plugins: []
}
