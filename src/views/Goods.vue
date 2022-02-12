<template>
  <div>
    <header>
    
      <van-search
        v-model="value"
        right-icon="search"
        left-icon=""
        @focus="searchGoods"
      >
        <template #label>
          <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="isAutoplay"
            :show-indicators="false"
          >
            <van-swipe-item
              @click="swipeItem"
              v-for="item in hotSearch"
              :key="item.id"
              >{{ item.goodsname }}</van-swipe-item
            >
          </van-swipe>
        </template>
      </van-search>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      isAutoplay: 3000,
      hotSearch: [
        {
          goodsname: "大师粉底液",
          id: 1,
        },
        {
          goodsname: "红管",
          id: 2,
        },
        {
          goodsname: "权力唇膏",
          id: 3,
        },
        {
          goodsname: "黑钥匙面膜",
          id: 4,
        },
      ],
    };
  },
  methods: {
    //搜索框
    searchGoods(e) {
      this.isAutoplay = 0;
    },
    //滚动内容的事件
    swipeItem(e) {
      console.log("e", e);
    },
  },
};
</script>


<style lang="scss">
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>