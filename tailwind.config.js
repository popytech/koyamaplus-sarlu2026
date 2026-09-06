/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '375px',  // Small phones
        'sm': '640px',  // Phones
        'md': '768px',  // Tablets
        'lg': '1024px', // Large tablets
        'xl': '1280px', // Desktops
        '2xl': '1536px', // Large desktops
      },
      spacing: {
        'mobile-safe': 'max(1rem, env(safe-area-inset-bottom))',
      },
      colors: {
        'brand-red': '#ff2353',
        'brand-blue': '#312883',
        'brand-white': '#F1F1F1',
      },
      fontFamily: {
        'tahoma': ['Tahoma', 'system-ui', 'sans-serif'],
        'corsiva': ['Monotype Corsiva', 'Georgia', 'serif'],
      },
      fontSize: {
        'brand-denomination': ['36px', { lineHeight: '1.2' }],
        'brand-body': ['12px', { lineHeight: '1.5' }],
        'brand-slogan': ['12px', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
};

