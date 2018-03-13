import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'
import { state } from './state'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})