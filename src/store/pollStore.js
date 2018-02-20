import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        error: null,
        loading: false,
        newPoll: {
            question: '',
            choices: [],
            date: null,
            time: null,
            imageUrl: '',
            imageName: '',    
            expiration: null

        },
    },

    getters: {
        user: state => state.user,
        error: state => state.error,
        loading: state => state.loading,
        userPoll: state => state.newPoll
    },

    mutations: {
        SET_LOADING (state, payload) {
            state.loading = payload
        },
        REG_USER (state, payload) {
            state.user = payload
        },
        SIGNIN_USER (state,payload) {
            state.user = payload
        },
        SET_ERROR (state, payload) {
            state.error = payload
        },
        CLEAR_ERROR (state) {
            state.error = null
        },
        CREATE_POLL (state, payload) {
            state.newPoll = payload
        }
    },

    actions: {
        registerUser ({commit}, payload) {
            commit('SET_LOADING', true)
            commit('CLEAR_ERROR')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                const newUser = {
                    id: user.uid,
                    email: user.email
                }
                commit('REG_USER', newUser)  
            })
            // .then(user => {
            //     var user = firebase.auth().currentUser;
            //         const newLocal = user.sendEmailVerification()
            //         return newLocal
            // })
            .catch(error => {
                commit('SET_LOADING', false)
                commit('SET_ERROR', error)
            })
        },

        autoSignIn ({commit}, payload) {
            const newUser = {
                id: payload.uid,
            }
            commit('SIGNIN_USER', newUser)
        },

        SignInUser ({commit}, payload) {
            commit('SET_LOADING', true)
            commit('CLEAR_ERROR')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('SET_LOADING', false)
                const newUser = {
                    id: user.uid,
                    email: user.email
                }
                commit('SIGNIN_USER', newUser)
            })
            .catch(error => {
                commit('SET_LOADING', false)
                commit('SET_ERROR', error)
            })
        },
        clearError ({commit}, payload) {
            commit('CLEAR_ERROR')
        },

        createPoll ({commit}, payload) {
            const newPoll = {
                question: payload.question,
                choices: payload.choices,
                date: payload.date,
                time: payload.time,
                imageUrl: payload.imageUrl,
                imageName: payload.imageName,
                expiration: payload.expiration              
            }
            commit('CREATE_POLL', newPoll)
            console.log(newPoll)
        }
    },
})