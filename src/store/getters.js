export const getters = {
    error: state => state.error,
    loading: state => state.loading,

    user(state) {
        return state.user
    },
    userPolls(state) {
        return state.loadedPolls
    },
    loadPoll(state) {
        return (pollId) => {
            return state.loadedPolls.find((poll) => {
                return poll.id == pollId
            })
        }
    },
    poll: state => state.poll
}
