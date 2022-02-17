<template>
  <div class="common">
    <!-- <van-row gutter="20">
      <van-col span="12">
        
          <van-image
            width="8rem"
            height="8rem"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        
      </van-col>
      <van-col span="12">span: 8</van-col>
    </van-row> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="200"
    >
      <van-row type="flex" justify="space-between" :gutter="5">
        <van-col span="12" v-for="item in goodsList" :key="item._id">
          <van-cell @click="getGoodsInfo(item.productCode)">
            <template v-solt:label>
              <van-image
                width="8rem"
                height="8rem"
                fit="cover"
                :src="item.productImages[0]"
              />
              <h5>{{ item.productName }}</h5>
              <span>￥{{ item.defaultPrice }}</span>
            </template>
          </van-cell>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>


<script>
export default {
  created() {
    // this.getGoodsList();
  },

  data() {
    return {
      goodsList: [],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      total: 0,
    };
  },
  methods: {
    //滚动加载
    onLoad() {
      this.getGoodsList();
    },
    //商品列表
    async getGoodsList() {
      const category = this.getCategory();
      if (category[this.$route.name] == "all") {
        const { data } = await this.$request.get("/product/goodslist", {
          params: {
            page: this.page,
          },
        });

        this.goodsListTotal(data.data.total, data.data.result);
      } else {
        // const { data } = await this.$request.get("/product/goodslist/", {
        //   params: {
        //     page: this.page,
        //     mainCategory: "m-" + category[this.$route.name],
        //   },
        // });
        const { data } = await this.$request.get(
          "/product/goodslist/" + "m-" + category[this.$route.name],
          {
            params: {
              page: this.page,
            },
          }
        );
        this.goodsListTotal(data.data.total, data.data.result);
      }
    },
    //获取路由name对应请求参数。
    getCategory() {
      const category = {
        all: "all",
        makeup: "makeup",
        skincare: "skincare",
        fragrance: "fragrance",
        others: "others",
      };
      return category;
    },
    //封装不同路由请求后的数据，但相同的操作。
    goodsListTotal(total, list) {
      this.total = total;
      this.goodsList = [...this.goodsList, ...list];
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      this.finished = this.goodsList.length == this.total;

      this.page++;
    },
    //获取商品代号，并跳转到详情页。
    getGoodsInfo(productCode) {
      this.$router.push("/details/" + productCode);
    },
  },
};
</script>


<style lang="scss">
.common {
  margin-top: 105px;
  .van-cell {
    .van-cell__value--alone {
      text-align: center;
      h5 {
        margin: 0px;
        width: 10em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>



