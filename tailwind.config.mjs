/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './public/**/*.{html,svg}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          100: '#F3F6F4',
          300: '#C9D8D0',
          500: '#9DB9A7',
          700: '#6F8F7B',
          900: '#3E5246',
        },
        lilac: {
          100: '#F8F1FA',
          300: '#E7D3EE',
          500: '#C49FD3',
          700: '#9A6BAC',
        },
        mist: {
          100: '#F0F5FF',
          300: '#C9D6F0',
          500: '#8BA4D9',
          700: '#5A6FAF',
        },
        violet: {
          100: '#F3F0FF',
          300: '#D4C5F9',
          500: '#A78BFA',
          700: '#7C3AED',
        },
        teal: {
          100: '#F0FDFA',
          300: '#99F6E4',
          500: '#14B8A6',
          700: '#0F766E',
        },
        neutral: {
          50: '#FAFAF7',
          100: '#EDEBE7',
          300: '#E2E2E2',
          900: '#2A2A2A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"DM Serif Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

