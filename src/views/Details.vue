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
      <!-- <van-button
        icon="plus"
        type="primary"
        v-for="item in colorNum"
        :key="item.id"
      >
        <template #icon>
          <van-image
          v-if="item.variantIcon"
            width="5rem"
            height="5rem"
            fit="cover"
            :src="item.variantIcon"
          />
        </template>
      </van-button> -->
      <div class="color_block" v-for="item in colorNum" :key="item.id">
       
        
      </div>

    </div>
  </div>
</template>


<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import Loading from "../components/Loading.vue";
export default {
  name: "Details",
  created() {
    console.log("create is working");
    //this.getGoodsInfo();
  },
  mounted() {
    //console.log("mounted is working");
  },
  activated() {
    this.getGoodsInfo(this.$route.params.productCode);

    console.log("activated is working");
  },

  data() {
    return {
      GoodsImgs: [],
      currentGoodsInfo: {},
      childrenInfo: [],
      colorNum: [],

      //productCode: this.$route.params.productCode,
    };
  },
  computed: {
    //...mapState("Loading", ["isloading"]),
    ...mapGetters(["getLoadingState"]),
    //获取默认展示五种色号
    // getColorNum() {
    //   return this.childrenInfo.length >= 5 ? 5 : this.childrenInfo.length;
    // },

    isColororImg() {
      const res = this.childrenInfo.filter((item) => {
        item.variantColor;
      });
      console.log("color", res);
    },
  },
  components: { Loading },
  methods: {
    //获取当前商品数据
    async getGoodsInfo(productCode) {
      const { data } = await this.$request.get("/product/" + productCode);
      data.code == 200 ? this.$store.commit("Loading/hideLoading") : "";
      this.GoodsImgs = data.data.productImages;
      this.currentGoodsInfo = data.data;
      this.childrenInfo = this.currentGoodsInfo.childProductList;
      this.colorNum = this.childrenInfo.slice(0, 5);
      console.log("colorNum", this.colorNum);
      console.log("childrenInfo", this.childrenInfo);
    },
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
</style>