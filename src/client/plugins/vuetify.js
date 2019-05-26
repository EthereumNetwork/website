import Vue from 'vue'
import Vuetify, {
  VImg,
  VApp,
  VCard,
  VFlex,
  VLayout,
  VContainer,
  VCardTitle,
  VProgressCircular } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VImg,
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VFadeTransition,
    VCard,
    VFlex,
    VLayout,
    VContainer,
    VCardTitle,
    VProgressCircular
  },
  directives: {
    Ripple
  },
  iconfont: 'md'
})
