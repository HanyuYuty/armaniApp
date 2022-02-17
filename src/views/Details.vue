<template>
  <div class="details">
    <div class="status" v-if="getLoadingState">
      <Loading></Loading>
    </div>
    <!-- :autoplay="3000" -->
    <div v-else class="swipeImg">
      <van-swipe
        class="my-swipe"
        indicator-color="white"
        :show-indicators="false"
        ref="swipe"
        :autoplay="3000"
      >
        <van-swipe-item v-for="item in GoodsImgs" :key="item">
          <van-image
            width="24.3rem"
            height="26rem"
            fit="cover"
            :src="item"
            :key="item"
          />
        </van-swipe-item>
      </van-swipe>
      <div class="goods_info">
        <h4 class="productname">{{ currentGoodsInfo.productName }}</h4>
        <span class="goods-price">￥{{ currentGoodsInfo.defaultPrice }}</span>
      </div>
      <!-- <div class="line"></div> -->
    </div>
    <div class="colors">
      <h5>{{ defalutTitle }}</h5>
      <IsColor
        :colortype="item"
        v-for="item in colorNum"
        :key="item.id"
        @click="getdefalutText"
      ></IsColor>
      <van-button  type="primary"  >
        <template #default>
          更多
        </template>
      </van-button>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Loading from "../components/Loading.vue";
import IsColor from "../components/IsColor.vue";
export default {
  name: "Details",
  created() {
    
  },
  mounted() {
    
  },
  activated() {
    this.getGoodsInfo(this.$route.params.productCode);
  },
  deactivated() {
  
    this.defalutTitle = "";
    console.log(" this.defalutTitle", this.defalutTitle);
  },

  data() {
    return {
      GoodsImgs: [],
      currentGoodsInfo: {},
      childrenInfo: [],
      colorNum: [],
      defalutTitle: "",
    };
  },
  computed: {
    //...mapState("Loading", ["isloading"]),
    ...mapGetters(["getLoadingState"]),

  },
  components: { Loading, IsColor },
  methods: {
    //获取当前商品数据
    async getGoodsInfo(productCode) {
      const { data } = await this.$request.get("/product/" + productCode);
      data.code == 200 ? this.$store.commit("Loading/hideLoading") : "";
      //获取当前商品轮播图
      this.GoodsImgs = data.data.productImages;
      //获取当前商品信息
      this.currentGoodsInfo = data.data;
      //获取子产品信息
      this.childrenInfo = this.currentGoodsInfo.childProductList;
      //默认显示5个以内的子产品
      this.colorNum = this.childrenInfo.slice(0, 5);
      console.log(' this.colorNum', this.colorNum);
      //获取默认展示子产品规格
      this.defalutTitle = this.colorNum[0].variantFirstCustValue;
  
    },
    //点击获取当前商品规格
    getdefalutText(ev) {
      this.defalutTitle = ev;
    },
  },
  watch: {
  },
};
</script>


<style lang="scss">
.details {
  margin-bottom: 100px;
}
.my-swipe {
  transition: all 1s;
  -webkit-animation: anim 1s ease;
}
@keyframes anim {
  0% {
    height: 0px;
  }

  100% {
    height: 100%;
  }
}
.goods_info {
  text-align: center;
  .goods-price {
    font-size: 18px;
  }
}

// .line{
//   width: 100%;
//   height: 2px;
//   background: rgb(187, 187, 187);
// }
.van-button{
  background: #fff;
  border: 1px solid black;
  color: #000;
  font-size: 12px;
  width: 10vw;
  height: 4.5vh;
  padding: 0px;
  vertical-align: text-bottom;
  

}
</style>