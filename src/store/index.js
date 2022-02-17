import Vue from 'vue'
import Vuex from 'vuex'
import Loading from "./loading"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    
  },
  getters:{
    getLoadingState:state=> state.Loading.isloading
  },
  actions: {
  },
  modules: {
    Loading
    
  }
})



