// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import vueaxios from 'axios'

import { config } from './firebaseconfig'

import 'vuetify/dist/vuetify.min.css'

window.axios = axios
const axios = window.axios = vueaxios
Vue.use(Vuetify)

Vue.config.productionTip = false
/* eslint-disable no-new */
let app;

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>',
    })    
  }

})
