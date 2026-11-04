/* Wini Hair – Tailwind CDN config */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light:   '#dfc06a',
          dark:    '#a07c2c',
        },
        surface: {
          DEFAULT: '#141414',
          raised:  '#1e1e1e',
        },
        'wh-border': '#2a2a2a',
      },
      fontFamily: {
        display: ['"Josefin Sans"', 'sans-serif'],
        body:    ['Raleway', 'sans-serif'],
      },
      screens: { xs: '480px' },
    },
  },
  plugins: [],
};
