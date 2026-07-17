/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090B',
        card: '#111113',
        'card-border': 'rgba(255,255,255,0.06)',
        primary: '#3B82F6',
        'primary-light': '#60A5FA',
        'primary-glow': 'rgba(59,130,246,0.15)',
        cyan: '#22D3EE',
        purple: '#A855F7',
        indigo: '#6366F1',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'float-medium': 'float 15s ease-in-out infinite',
        'float-fast': 'float 10s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'progress': 'progress 0.3s ease',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate3d(30px,-20px,0) scale(1.05) rotate(2deg)' },
          '50%': { transform: 'translate3d(-20px,30px,0) scale(0.95) rotate(-1deg)' },
          '75%': { transform: 'translate3d(20px,10px,0) scale(1.02) rotate(1deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-3%)' },
          '20%': { transform: 'translate(3%,2%)' },
          '30%': { transform: 'translate(-1%,4%)' },
          '40%': { transform: 'translate(2%,-2%)' },
          '50%': { transform: 'translate(-3%,1%)' },
          '60%': { transform: 'translate(1%,3%)' },
          '70%': { transform: 'translate(-2%,-1%)' },
          '80%': { transform: 'translate(3%,-3%)' },
          '90%': { transform: 'translate(-1%,2%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
