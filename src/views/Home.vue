<template>
  <div class="home">
    <!-- 顶部轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="black">
      <van-swipe-item
        v-for="item in images"
        :key="item.uuid"
        :code="item.linkData.code"
        @click="getCode"
      >
        <template #default>
          <van-image fit="cover" :src="item.imageUrlMobile" lazy-load />
          <!-- <img v-lazy="item.imageUrlMobile" /> -->
        </template>
      </van-swipe-item>
    </van-swipe>
    <!-- 明星商品 -->
    <h1>明星产品</h1>
    <van-tabs v-model="active" @click="checkCatename">
      <van-tab
        :title="item.catename"
        v-for="item in hotGoodsTab"
        :key="item.uuid"
      >
        <template #default>
          <swiper
            ref="mySwiper"
            :options="swiperOptions"
            style="padding-left: 5px"
          >
            <swiper-slide
              v-for="item in hotGoodsInfomation"
              :key="item.id"
              style="width: 195px; min-height: 200px"
            >
              <div>
                <van-image
                  width="8rem"
                  height="8rem"
                  fit="contain"
                  :src="item.productImages[0]"
                />
              </div>

              <div class="productname">{{ item.productName }}</div>
              <div class="productname-en">{{ item.productNameEn }}</div>

              <van-rate
                v-model="item.productScore"
                :size="12"
                color="black"
                void-icon="star"
                void-color="#eee"
                readonly
              />
              <div class="goods-price">￥{{ item.defaultPrice }}</div>
              <van-button type="primary" block color="black" size="small"
                >立即购买</van-button
              >
            </swiper-slide>

            <!-- <div class="swiper-pagination"></div> -->
            <!-- 如果需要导航按钮 -->
           
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
           
          </swiper>
        </template>
      </van-tab>
    </van-tabs>
    <!-- 官网尊享 -->
    <h1>官网尊享</h1>
    <div class="images-box">
      <van-image
        width="23rem"
        height="10rem"
        fit="scale-down"
        :src="item.imageUrlMobile"
        v-for="item in website"
        :key="item.uuid"
        @click="getImageCode(item.linkData.code)"
      />
    </div>
    <div class="space" style="height: 40px"></div>
    <!-- 底部轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="black">
      <van-swipe-item
        v-for="item in buttomBanner"
        :key="item.uuid"
        :code="item.linkData.code"
        @click="getCode"
      >
        <template #default>
          <van-image fit="cover" :src="item.imageUrlMobile" lazy-load />
          <!-- <img v-lazy="item.imageUrlMobile" /> -->
        </template>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      images: [],
      active: 0,
      hotGoodsTab: [], //明星产品tab
      hotGoods: [], //明星产品（初始状态）
      hotGoodsInfomation: [], //获取明星产品其他信息（详情）
      hotGoodsCode: [],//明星产品的code
      website: [],//官网尊享三组图
      buttomBanner: [],//底部bannner
      swiperOptions: {
        slidesPerView: 2, //显示个数
        // direction: "vertical",
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  created() {
    //获取顶部轮播图
    this.getTopBanner();
  },
  methods: {
    getCode(e) {
      console.log("e", e);
    },
    //获取会员尊享的code
    getImageCode(e) {
      console.log("e", e);
    },
    //获取顶部轮播图
    getTopBanner() {
      this.$request.get("/getIndex/" + "valentine").then(({ data }) => {
        const dataList = data.data.map((item) => JSON.parse(item.content));
        console.log('dataList',dataList);
        this.images = dataList[0].dataList;
        
        //明星产品的tab
        this.hotGoodsTab = dataList[1].dataList;
        console.log('this.hotGoodsTab',this.hotGoodsTab);      
        this.website = dataList[4].dataList;
        this.buttomBanner = dataList[6].dataList;
        this.defaultCatename;
      });
    },
    //点击之后获取对应明星产品
    checkCatename(name, title) {
      this.hotGoods = this.hotGoodsTab.filter(
        (item) => item.catename == title
      )[0].productList;
      this.hotGoodsCode = this.hotGoods.map((item) => item.productCode);
      console.log('this.hotGoodsCode',this.hotGoodsCode);
      this.hotGoodsInfo();
    },
    //获取明星商品其他信息
    hotGoodsInfo() {
      this.$request
        .post(
          "/product/multiple",
          {
            codeArr: this.hotGoodsCode,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(({ data }) => {
          this.hotGoodsInfomation = data.data;
          console.log("hotGoodsInfomation", this.hotGoodsInfomation);
        });
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    //默认展现粉妆衣橱
    defaultCatename() {
      this.hotGoods = this.hotGoodsTab.filter(
        (item) => item.catename == "粉妆衣橱"
      )[0].productList;
      this.hotGoodsCode = this.hotGoods.map((item) => item.productCode);
      this.hotGoodsInfo();
    },
  },
  mounted() {
    // this.swiper.slideTo(3, 1000, false);
  },
  watch: {},
};
</script>




<style lang="scss">

.van-tabs__line {
  width: 55px;
  background: #000;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  height: 200px;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  background: #fafafa;
  flex-wrap: wrap;
  flex-direction: column;
  margin-right: 5px;
  padding-top: 10px;
}

.productname {
  font-size: 16px;
  padding: 0 10px;
  font-weight: 400;
  text-align: center;
  box-sizing: border-box;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.productname-en {
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  text-align: center;
  box-sizing: border-box;
  color: #666;
  font-size: 12px;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}
.van-button {
  width: 160px;
}
.goods-price {
  font-family: Bahnschrift SemiLight Condensed;
}
.images-box {
  box-sizing: border-box;
  padding: 0px 10px;
  margin-bottom: 30px;
}

.van-swipe__indicator{
  background: rgb(126, 126, 126);
  
}
</style>