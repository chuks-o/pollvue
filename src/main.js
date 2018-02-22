// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import Vuetify from 'vuetify'
import Vueaxios from 'axios'
import Vuex from 'vuex'
import { config } from './firebaseconfig'
import 'vuetify/dist/vuetify.min.css'
import AppAlert from './components/AppAlert'
import { store } from './store/pollStore'
// 
/* Global Components */
Vue.component('app-alert', AppAlert);
Vue.use(Vuetify)
/* End of globals */

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store,
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('loadPolls')
        this.$router.push('/polls')
      }
      this.$router.push('/')
    })
  }
})    

