import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EC4A0A',
        sub: '#F6A88A',
        black: {
          100: '#D0D5DD',
          200: '#667085',
          300: '#344054',
          default: '#000000',
        },
      },
    },
  },
  plugins: [tailwindAnimate],
};
