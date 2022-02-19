import { mapGetters } from "vuex";
import Loading from "../components/Loading.vue";
const mixin = {
    data(){
        return {
            addToCartList: [], //添加到购物车的数据
        }
    },
    activated(){
        //确保localStorage是否有数据。
    this.checkLocalStorage();
    },
    methods:{
         //获取localStorage是否有数据
    checkLocalStorage() {
        let cartList = window.localStorage.getItem("goodsInfo");
  
        try {
          cartList = JSON.parse(cartList) || [];
          console.log("cartList", cartList);
        } catch (err) {
          cartList = [];
        }
        this.addToCartList = cartList;
      },
    },

    computed: {
        //该getters为进入组件时，网络延迟导致的数据未回来时，会出现加载中组件。
        ...mapGetters(["getLoadingState"]),


    },
    components:{Loading}
}


export default mixin