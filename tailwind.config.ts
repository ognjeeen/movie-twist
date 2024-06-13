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
        customRed: '#fa5252',
        redDark: '#e03131',
      },
    },
  },
};
export default config;
