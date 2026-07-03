/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PingFang SC', 'Microsoft YaHei', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        tv: {
          dark: '#050505',
          panel: 'rgba(20, 20, 25, 0.75)',
          border: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 255, 255, 1)',
          accent: '#ffffff',
        }
      },
      boxShadow: {
        'glass': '0 10px 40px -10px rgba(0,0,0,0.5)',
        'focus': '0 0 0 4px rgba(255, 255, 255, 0.3), 0 20px 40px -10px rgba(0,0,0,0.8)',
        'glow': '0 0 20px rgba(255,255,255,0.4)',
      }
    },
  },
  plugins: [],
}
