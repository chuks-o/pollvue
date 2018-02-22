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
        loadedPolls:[]
    },

    getters: {
        user: state => state.user,
        error: state => state.error,
        loading: state => state.loading,
        userPolls: state => state.loadedPolls
    },

    mutations: {
        SET_LOADING (state, payload) {
            state.loading = payload
        },
        REG_USER (state, payload) {
            state.user = payload
        },
        SET_USER (state,payload) {
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
        },
        LOADED_POLLS (state, payload) {
            state.loadedPolls = payload
        }
    },

    actions: {
        loadPolls ({commit, getters}) {
            commit('SET_LOADING', true)
            const user = getters.user

            firebase.database().ref('polls').once('value')
            .then(data => {
                commit('SET_LOADING', false)
                const polls = []
                var obj = data.val()

                for (let key in obj) {
                    if (obj[key].userId == user.id ) {
                        polls.push({
                            question: obj[key].question,
                            choices: obj[key].choices,
                            date: obj[key].date,
                            time: obj[key].time,
                            imageUrl: obj[key].imageUrl,
                            imageName: obj[key].imageName,
                            expiration: obj[key].expiration,
                            userId: obj[key].userId
                        })
                    } 
                }
                commit('LOADED_POLLS', polls)
            })
            .catch(error => {
                console.log(error)
            })
        },

        createPoll({ commit, getters }, payload) {
            const newPoll = {
                question: payload.question,
                choices: payload.choices,
                date: payload.date,
                time: payload.time,
                imageUrl: payload.imageUrl,
                imageName: payload.imageName,
                expiration: payload.expiration.toISOString(),
                userId: getters.user.id
            }
            firebase.database().ref('polls').push(newPoll)
                .then((data) => {
                    const key = data.key
                    commit('CREATE_POLL', { newPoll, id: key })
                }).catch(error => {
                    console.log(error)
                })
            // console.log(newPoll)
        },

        registerUser ({commit}, payload) {
            commit('SET_LOADING', true)
            commit('CLEAR_ERROR')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                const newUser = {
                    id: user.uid,
                    email: user.email,
                    polls: []

                }
                commit('REG_USER', newUser)  
            })
            .catch(error => {
                commit('SET_LOADING', false)
                commit('SET_ERROR', error)
            })
        },

        autoSignIn ({commit}, payload) {
            const newUser = {
                id: payload.uid,
                email: payload.email
            }
            commit('SET_USER', newUser)
        },

        SignInUser ({commit}, payload) {
            commit('SET_LOADING', true)
            commit('CLEAR_ERROR')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('SET_LOADING', false)
                const newUser = {
                    id: user.uid,
                    email: user.email,
                    polls: []
                }
                commit('SET_USER', newUser)
            })
            .catch(error => {
                commit('SET_LOADING', false)
                commit('SET_ERROR', error)
            })
        },

        clearError ({commit}, payload) {
            commit('CLEAR_ERROR')
        },

        logout ({commit}) {
            firebase.auth().signOut()
            commit('SET_USER', null)
            commit('LOADED_POLLS', null)
        },

    },
})