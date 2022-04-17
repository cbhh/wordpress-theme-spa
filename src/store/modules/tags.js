const state = () => ({
    tagList: []
})

const mutations = {
    storeTagList(state, data) {
        state.tagList = data;
    }
}

export default {
    state,
    mutations
}