/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nhl: {
          blauw: '#003366',
          'blauw-dark': '#002244',
          'blauw-light': '#1A5276',
          oranje: '#E8721C',
          teal: '#00838F',
          'grijs-licht': '#F2F4F7',
          'grijs-mid': '#D0D5DD',
          'grijs-donker': '#555555',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
