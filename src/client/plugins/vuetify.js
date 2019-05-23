import Vue from 'vue'
import Vuetify, {
  VApp, 
  VNavigationDrawer,
  VFooter,
  VToolbar,
  VFadeTransition
} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VFadeTransition
  },
  directives: {
    Ripple
  },
  iconfont: 'md'
})
