import Vue from 'vue'
import Vuetify, {
  VApp,
  VImg,
  VCard,
  VFlex,
  VAlert,
  VSelect,
  VLayout,
  VContainer,
  VDataTable,
  VCardTitle,
  VProgressCircular } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VImg,
    VCard,
    VFlex,
    VAlert,
    VSelect,
    VLayout,
    VContainer,
    VDataTable,
    VCardTitle,
    VProgressCircular
  },
  directives: {
    Ripple
  },
  iconfont: 'md'
})
