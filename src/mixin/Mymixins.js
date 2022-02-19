import { mapGetters } from "vuex";
import Loading from "../components/Loading.vue";
import request from "../utils/request"
const mixin = {
    data(){
        return {
            addToCartList: [], //添加到购物车的数据
            //footerList:[],
        }
    },
    activated(){
      
    },
    created(){
      //this.getFooter()
    },
    methods:{
      // async getFooter(){
      //   const {data}  = await request.get('/getIndex/nav/'+'footerPledge');
      //   this.footerList = JSON.parse(data.data[0].content).pledge;
      //   console.log(JSON.parse(data.data[0].content));
        

      // }
    },

    computed: {
        //该getters为进入组件时，网络延迟导致的数据未回来时，会出现加载中组件。
        ...mapGetters(["getLoadingState"]),

       


    },
    components:{Loading}
}


export default mixin