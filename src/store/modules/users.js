const state = () => ({
    userList: []
})

const mutations = {
    storeUserList(state, data) {
        state.userList = data;
    }
}

export default {
    state,
    mutations
}

