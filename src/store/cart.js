export default {
    namespaced: true,
    state: {
        cartList:[],
    },
    getters: {
        cartListNum(state){
            return state.cartList.length
        }


    },
    mutations: {
        addGoods(state,payload){
            if(!state.cartList.includes(payload)){
                state.cartList.push(payload)
            }

        }
        
    },
    actions: {}
}