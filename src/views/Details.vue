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
      <van-button type="primary" @click="changeShow" class="show_button">
        <template #default> 更多 </template>
      </van-button>
    </div>
    <div class="sku">
      <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :hide-stock="true"
        :hide-selected-text="true"
        :disable-stepper-input="true"
      >
        <template #sku-stepper>
          <span></span>
        </template>
        <template #sku-actions>
          <van-button
            type="primary"
            block
            color="black"
            @click="onAddCartClicked"
            >确定</van-button
          >
        </template>
      </van-sku>
    </div>
    <div class="buttomContent">
      <Introduction
        :introduction="currentGoodsInfo.introduction"
      ></Introduction>
    </div>
    <div class="bottom_bar">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="首页">
          <template #icon>
            <i class="iconfont icon-MAC"></i>
          </template>
        </van-goods-action-icon>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartListNum" />
        <van-goods-action-icon icon="shop-o" text="客服" />
        <van-goods-action-button
          type="primary"
          text="加入购物车"
          color="black"
          @click="addToCart()"
        />
        <van-goods-action-button type="primary" text="立即购买" color="black" />
      </van-goods-action>
    </div>

  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Loading from "../components/Loading.vue";
import IsColor from "../components/IsColor.vue";
import Introduction from "../components/Introduction.vue";
export default {
  name: "Details",
  created() {},
  mounted() {},
  activated() {
    this.getGoodsInfo(this.$route.params.productCode);
  },
  deactivated() {
    this.defalutTitle = "";
  },

  data() {
    return {
      GoodsImgs: [],
      currentGoodsInfo: {},
      childrenInfo: [],
      colorNum: [],
      defalutTitle: "",
      sku: {
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "黑色", // skuValueName：规格值名称
                imgUrl: "https://img01.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://img01.yzcdn.cn/1p.jpg", // 用于预览显示的规格类目图片
              },
              {
                id: "1",
                name: "蓝色",
                imgUrl: "https://img01.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img01.yzcdn.cn/2p.jpg",
              },
            ],
            //largeImageMode: true, //  是否展示大图模式
          },
        ],
        price: "1.00", // 默认价格（单位元）
      },
      goods: {},
      show: false,
      goodsId: "",
      goodsInfo: [],
    };
  },
  computed: {
    //...mapState("Loading", ["isloading"]),
    ...mapGetters(["getLoadingState"]),
    // ...mapGetters(["cartListNum"]),
    cartListNum(){
      console.log('?',this.$store.getters['Cart/cartListNum']);
      return this.$store.getters['Cart/cartListNum']
    }
  },
  components: { Loading, IsColor, Introduction },
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

      //获取sku信息
      this.sku.price = this.currentGoodsInfo.defaultPrice;
      this.goods.picture = this.currentGoodsInfo.productImages[0];

      //获取默认展示子产品规格
      this.defalutTitle = this.colorNum[0].variantFirstCustValue;
      this.getTree();
    },
    //点击获取当前商品规格
    getdefalutText(ev) {
      this.defalutTitle = ev;
    },
    //点击更多，弹窗显示
    changeShow() {
      this.show = true;
    },
    //点击确认，弹窗隐藏
    onAddCartClicked() {
      this.show = false;
    },
    //获取更多色号
    getTree() {
      let tree = [];
      this.childrenInfo.forEach((item) => {
        tree.push({
          id: item.id,
          name: item.variantFirstCustValue,
          imgUrl: item.variantIcon || item.variantColor,
          previewImgUrl: item.variantIcon || item.variantColor,
        });
      });
      this.sku.tree[0].v = tree;
    },
    //加入购物车
    addToCart() {
     if(!this.goodsInfo.includes(this.currentGoodsInfo.productCode)){
       localStorage.setItem('goodsInfo',this.currentGoodsInfo.productCode)
     }
      // this.$store.commit("Cart/addGoods", this.currentGoodsInfo.productCode);
      // console.log("state", this.$store.state.Cart.cartList);
    },
  },
  watch: {},
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

.show_button {
  background: #fff;
  border: 1px solid black;
  color: #000;
  font-size: 12px;
  width: 10vw;
  height: 4.5vh;
  padding: 0px;
  vertical-align: text-bottom;
}
.van-sku {
  height: 200px;
  border: 1px solid black;
}
.van-goods-action {
  z-index: 10;
}
.van-goods-action-button--first {
  margin-left: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.van-goods-action-button--last {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>


