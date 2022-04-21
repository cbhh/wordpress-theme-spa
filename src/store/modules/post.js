const state = () => ({
    title: "",
    time: "",
    bg: "",
    id: 0
})

const mutations = {
    setPostMeta(state, data) {
        state.title = data.title;
        state.time = data.time;
        state.bg = data.bg;
    }
}

export default {
    state,
    mutations
}

