import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.yellow.base,
        secondary: colors.deepPurple.base,
        accent: colors.pink.base,
      },
      dark: {
        primary: colors.deepPurple.base,
        secondary: colors.yellow.base,
        accent: colors.pink.base,
      },
    },
  },
})
export default vuetify
