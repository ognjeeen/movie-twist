import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#212529',
        backgroundLight: '#343a40',
        primary: '#C59658',
        primaryLight: '#e1ab65',
        buttonHover: '#b1874f',
        textColor: '#dee2e6',
        textDarkColor: '#adb5bd',

        animeBluePrimary: '#399a99',
        animeBlueLight: '#95d2d3',
        animeBlueButtonHover: '#2e7b7a',
      },
      keyframes: {
        click: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
      },
      animation: {
        click: 'click 0.2s ease-out',
      },
    },
  },
};
export default config;
