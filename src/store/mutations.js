export const mutations = {
    SET_LAYOUT (state, payload) {
        state.layout = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
    REG_USER(state, payload) {
        state.user = payload
    },
    SET_USER(state, payload) {
        state.user = payload
    },
    SET_ERROR(state, payload) {
        state.error = payload
    },
    CLEAR_ERROR(state) {
        state.error = null
    },
    CREATE_POLL(state, payload) {
        state.newPoll = payload
    },
    LOADED_POLLS(state, payload) {
        state.loadedPolls = payload
    },
    POLL(state, payload) {
        state.poll = payload
    },
    SET_TOKEN(state, token) {
        localStorage.setItem('token', token)
        state.token = token
    }
}