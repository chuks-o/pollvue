require('jsdom-global')()

const Vue = require('vue')
const Vuetify = require('vuetify').default

Vue.config.productionTip = false
Vue.use(Vuetify)
window.Vue = Vue

Vue.config.ignoredElements = [
    'bounce-loader'
]