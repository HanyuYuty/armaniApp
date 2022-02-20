//⭐，页面刷新，vuex也会刷新，state的状态值，会回到初始值，像组件生命周期。因此，一开始就先获取localStorage的值，并赋值给状态值。即使页面刷新，数据也不会回到初始状态。
let cartList = window.localStorage.getItem('goodsInfo');

try {
    cartList = JSON.parse(cartList) || [];
} catch (err) {

    cartList = []
}
export default {

    namespaced: true,
    state: {
        cartList,
        Qty: 1,
    },
    getters: {

        cartListNum(state) {
            return state.cartList.length
        },




    },
    mutations: {
        //添加商品
        addGoods(state, payload) {
            //存入localStorage
            window.localStorage.setItem(
                "goodsInfo",
                JSON.stringify(payload)
            );
            // 改变state
            state.cartList = payload;
        },
        //添加数量
        addQty(state, payload) {
            const {
                value,
                id
            } = payload;
            state.cartList.find(item => item.id == id).qty = value;
            localStorage.setItem('goodsInfo', JSON.stringify(state.cartList))
        },
        //当前数量
        // currentQty(state,payload){
        //  state.Qty = state.cartList.find(item=>item.id==payload).qty;


        // }
        //删除商品
        deleteGoods(state, payload) {
            state.cartList = state.cartList.filter(item => item.id != payload);
            localStorage.setItem('goodsInfo', JSON.stringify(state.cartList))

        }

    },
    actions: {
      
    }
}