const state = () => ({
    categoryNavList: []
})

const mutations = {
    setBreadcrumbNav(state, data) {
        state.categoryNavList = data;
    }
}

export default {
    state,
    mutations
}

