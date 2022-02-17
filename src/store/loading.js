export default {

    namespaced: true,
    state: {
        isloading: true
    },
    getters: {


    },
    mutations: {
        showLoading(state) {
            state.isloading = true

        },
        hideLoading(state) {
            state.isloading = false
        }
    },
    actions: {}
}