const nyxTokens = ['bg', 'panel', 'card', 'raised', 'border', 'text', 'dim', 'tertiary', 'accent', 'on-accent', 'success', 'warning', 'danger', 'blue', 'violet', 'pink', 'red', 'coral', 'amber', 'green', 'teal']

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './nyx/index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: { nyx: Object.fromEntries(nyxTokens.map(token => [token, `rgb(var(--nyx-${token}) / <alpha-value>)`])) },
      fontFamily: { dm: ['DM Mono', 'ui-monospace', 'monospace'] },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
