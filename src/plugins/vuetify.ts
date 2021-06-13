import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green.base,
        secondary: colors.yellow.base,
        accent: colors.pink.base,
      },
      dark: {
        primary: colors.green.base,
        secondary: colors.yellow.base,
        accent: colors.pink.base,
      },
    },
  },
})
