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
      'primary': '#09f',
      'secondary': '#00ae00',
      'text': '#323232',
      'black': '#000',
      'white': '#fff',
      'error': '#f00',
    },
    fontFamily: {
      sans: ['Asap', 'sans-serif'] // sans class => global default family
    },
  },
  plugins: [],
}

