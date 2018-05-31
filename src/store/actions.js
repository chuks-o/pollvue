import * as firebase from 'firebase'

export const actions =  {
    loadPolls({ commit, getters }) {

        commit('SET_LOADING', true)
        const user = getters.user

        firebase.database().ref('polls').once('value').then(data => {
            commit('SET_LOADING', false)
            const polls = []
            var obj = data.val()

            for (let key in obj) {
                if (obj[key].userId == user.id) {
                    polls.push({
                        id: key,
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

    loadPoll({ commit }, id) {
        firebase.database().ref('polls/' + id).on('value', function(data) {
            var obj = data.val()
            console.log(obj)
            commit('POLL', obj)   
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
        console.log(newPoll)
    },

    updateCount({ commit }, payload) {
        let count = payload.count
        let countIndex = payload.selected
        firebase.database().ref(`polls/${payload.id}`).child('choices').child(countIndex).child('count').set(count)
    },

    registerUser({ commit }, payload) {
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

    autoSignIn({ commit }, payload) {
        const newUser = {
            id: payload.uid,
            userDetails: payload.email || payload.providerData
        }
        commit('SET_USER', newUser)
    },

    SignInUser({ commit }, payload) {
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

    twitterSignin({commit}) {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(result => {
            if (result.credential) {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                var token = result.credential.accessToken;
                var secret = result.credential.secret;
                commit('SET_TOKEN', token)
                // ...
            }
            // The signed-in user info.
            var user = result.user;
            commit('SET_USER', user)
        }).catch(error => {
            console.log(error)
        })
    },

    clearError({ commit }, payload) {
        commit('CLEAR_ERROR')
    },

    logout({ commit }) {
        firebase.auth().signOut()
        commit('SET_USER', null)
        commit('LOADED_POLLS', null)
    },

}