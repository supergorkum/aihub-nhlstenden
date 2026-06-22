/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nhl: {
          blauw: '#1E3A8A',
          'blauw-dark': '#162D6E',
          'blauw-light': '#2563EB',
          roze: '#E91E8C',
          'roze-light': '#F472B6',
          'roze-dark': '#BE185D',
          grijs: '#F8F9FB',
          'grijs-mid': '#E2E8F0',
          'grijs-donker': '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
