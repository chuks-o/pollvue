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
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

/* Global Components */
Vue.use(Vuetify)
Vue.component('app-alert', AppAlert);
Vue.component('bounce-loader', BounceLoader);
/* End of globals */

Vue.config.productionTip = false
/* eslint-disable no-new */

firebase.initializeApp(config)
const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>',
      store,
      created() {
        if (user) {
          store.dispatch('autoSignIn', user)
        }
      }
    })
    unsubscribe()
  })

