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
        preview-on-click-image
      >
        <template #sku-stepper>
          <span></span>
        </template>
        <template #sku-group>
          <IsColor
            :childreninfo="item"
            v-for="item in childrenInfo"
            :key="item.id"
            @click="getdefalutText"
          >
            <template #goods-label>
              <span>{{ item.variantFirstCustValue }}</span>
            </template>
          </IsColor>
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
        <van-goods-action-icon icon="chat-o" text="首页" to="/home">
          <template #icon>
            <i class="iconfont icon-MAC"></i>
          </template>
        </van-goods-action-icon>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="cartListNum"
          to="/cart"
        />
        <van-goods-action-icon icon="shop-o" text="客服" />
        <van-goods-action-button
          type="primary"
          text="加入购物车"
          color="black"
          @click="addToCart"
        />
        <van-goods-action-button type="primary" text="立即购买" color="black" />
      </van-goods-action>
    </div>
  </div>
</template>


<script>
import IsColor from "../components/IsColor.vue";
import Introduction from "../components/Introduction.vue";
import Mymixins from "../mixin/Mymixins"
export default {
  mixins:[Mymixins],
  name: "Details",
  created() {
    
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {
    
    //根据产品号请求数据
    this.getGoodsInfo(this.$route.params.productCode);
  },
  deactivated() {
    this.defalutTitle = "";
  },

  data() {
    return {
      GoodsImgs: [], //主商品轮播图
      currentGoodsInfo: {}, //当前主产品信息
      childrenInfo: [], //主产品的子产品信息
      colorNum: [], //默认显示子产品数
      defalutTitle: "", //默认显示子产品规格
      sku: {
        //sku组件配置
        tree: [],
        price: "", // 默认价格（单位元）
      },
      goods: {}, //sku组件配置
      show: false, //sku是否显示
      goodsId: "",
      
    };
  },
  computed: {
   
    //获取此时购物车商品数量
    cartListNum() {
     
      return this.$store.getters["Cart/cartListNum"];
    },
  },
  components: {
    IsColor,
    Introduction,
  },
  methods: {
    //获取当前商品数据
    async getGoodsInfo(productCode) {
      const { data } = await this.$request.get("/product/" + productCode);
      data.code == 200 ? this.$store.commit("Loading/hideLoading") : "";
      //获取当前商品轮播图
      this.GoodsImgs = data.data.productImages;
      //获取当前主商品信息
      this.currentGoodsInfo = data.data;
      // //获取子产品信息
      this.childrenInfo = this.currentGoodsInfo.childProductList;

      // //默认显示5个以内的子产品
      this.colorNum = this.childrenInfo.slice(0, 5);

      //sku商品的大图以及价格
      this.sku.price = this.currentGoodsInfo.defaultPrice;
      this.goods.picture = this.currentGoodsInfo.productImages[0];

      //获取默认展示子产品规格
      this.defalutTitle = this.colorNum[0].variantFirstCustValue;
    },
    //点击获取当前商品规格
    getdefalutText(ev) {
      //默认展示商品规格号
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
   
    //加入购物车
    addToCart() {
      //点击时拿到当前选择的子产品，用户若无选择，默认为第一个子产品。
      const {
        baseProduct,
        baseProductName,
        id,
        variantFirstCustValue,
        productCode,
        channelPrice,
      } = this.childrenInfo.find(
        (item) => item.variantFirstCustValue == this.defalutTitle
      );
      //先判断购物车数据是否有当前选择的商品，如果有数量+1，没有才添加数据。
      const product = this.addToCartList.find(
        (item) => item.productCode == productCode
      );
      if (product) {
        product.qty++;
      } else {
        this.addToCartList.push({
          baseProduct,
          baseProductName,
          id,
          variantFirstCustValue,
          productCode,
          channelPrice,
          qty: 1,
        });
      }
      this.$store.commit("Cart/addGoods", this.addToCartList);
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

.van-sku-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 15px;

  .colortype {
    float: left;
    margin-bottom: 10px;
    display: inherit;
    box-sizing: border-box;
    width: 43vw;
    height: 6vh;
    background: rgb(0, 0, 0, 0.1);
    align-items: center;
    border-radius: 5px;

    .currentImg {
      width: 20%;
      height: 66%;
      flex-shrink: 0;
      margin-left: 5px;
    }

    span {
      margin-left: 10px;
      font-size: 13px;
    }
  }
}
</style>