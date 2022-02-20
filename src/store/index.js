import Vue from 'vue'
import Vuex from 'vuex'
//import persistedState from 'vuex-persistedstate'
import Loading from "./loading"
import Cart from "./cart"
import UserInfo from "./userInfo"

Vue.use(Vuex)

export default new Vuex.Store({
  //plugins: [persistedState()],
  state: {},
  mutations: {

  },
  getters: {
    getLoadingState: state => state.Loading.isloading,
    isLogin(state) {

      return !!state.UserInfo.userInfo._id
    }
  },
  actions: {},
  modules: {
    Loading,
    Cart,
    UserInfo

  }
})