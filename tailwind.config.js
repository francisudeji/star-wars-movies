const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ['./src/**/*.js'],
  theme: {
    screens: {
      sm: '576px'
      // md: '768px',
      // lg: '992px',
      // xl: '1280px'
    },
    extend: {
      fontFamily: {
        starjedi: ['Starjedi', ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans
      },
      colors: {
        ...defaultTheme.colors,
        'sw-yellow': '#FFE81F'
      }
    }
  },
  variants: {},
  plugins: []
}
