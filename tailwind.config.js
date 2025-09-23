/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--secondary-color)',
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
        },
        accent: {
          DEFAULT: 'var(--accent-color)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        background: 'var(--background-color)',
        'card-bg': 'var(--card-background)',
        success: 'var(--success-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border-color)',
      },
      boxShadow: {
        light: 'var(--shadow-light)',
        medium: 'var(--shadow-medium)',
        large: 'var(--shadow-large)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
