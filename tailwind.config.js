/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  // mode: 'jit', // default. faster build time => generates on demand
  content: [ // purge id deprecated but treeshaking still works
    "./src/**/*.{html,ts}",
  ],
  theme: { // custom overwritten css properties
    // if padding is defined here, it means only p-frame available,
    // other default values provided by Tailwind like p-4 will no longer exist
    // use extend then to keep other default values defined by Tailwind
    // padding: {
    //   frame: '50px'
    // },
    extend: {
      screens: {
        sm: '500px',
        md: '800px',
        lg: '1200px',
      },
      colors: {
        primary: '#fce0dd',
        secondary: '#f9e4f5',
        tertiary: '#f5f6fa',
        text: '#323232',
        gray: '#cccccc',
        black: '#000',
        white: '#fff',
        error: '#f00',
      },
      fontFamily: {
        sans: ['Asap', 'sans-serif'] // sans class => global default family. See style.scss -> body
      },
      spacing: {
        // apply spacing values for margin, padding, width, height, and more using Tailwind's utility classes.
        // alternatively, may use arbitrary like p-[28px] => padding 28px
        hh: '90px', // header's height
        50: '50px',
        30: '30px',
        20: '20px',
        15: '15px',
        10: '10px',
        5: '5px',
      },
      // padding: {
      //   frame: '50px'
      // }
    }
  },
  plugins: [],
}
