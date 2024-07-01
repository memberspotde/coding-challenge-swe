/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  mode: 'jit', // faster build time => generates on demand
  content: [ // purge id deprecated but treeshaking still works
    "./src/**/*.{html,ts}",
  ],
  theme: { // custom overwritten properties
    screens: {
      sm: '500px',
      md: '800px',
      lg: '1200px',
      xl: '1500px',
    },
    colors: {
      primary: '#fce0dd',
      secondary: '#f9e4f5',
      tertiary: '#f5f6fa',
      text: '#323232',
      black: '#000',
      white: '#fff',
      error: '#f00',
    },
    fontFamily: {
      sans: ['Asap', 'sans-serif'] // sans class => global default family
    },
    fontSize: {
      sm: '14px',
      base: '18px',
      lg: '26px',
      xl: '28px',
      '2xl': '48px',
    },
    padding: {
      frame: '50px'
    }
  },
  plugins: [],
}

