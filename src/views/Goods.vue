<template>
  <div>
    <!-- <van-search
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
      </van-search> -->
    <header>
      <InputPlaceHolder
        :placeholder="hotSearch"
        @search="getGoodsInfo"
        @input="fn1"
      ></InputPlaceHolder>
    </header>
    <van-notice-bar
      left-icon=""
      :scrollable="false"
      background="rgb(223, 223, 223)"
      color="black"
      mode="closeable"
    >
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="2000"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="item in NoticeDate"
          :key="item.uuid"
          @click="getNoticeInfo(item.linkData.code)"
          >{{ item.title }}</van-swipe-item
        >
      </van-swipe>
    </van-notice-bar>
    <aside>
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          :title="item.title"
          v-for="item in sidebarList"
          :key="item.id"
        />
      </van-sidebar>
    </aside>
  </div>
</template>

<script>
import InputPlaceHolder from "../components/Myinput.vue";
export default {
  created() {
    this.getNoticeDate();
  },
  data() {
    return {
      value: "",
      NoticeDate: [], //公告栏初始
      activeKey: 0,
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
      currentContent: "",
      sidebarList: [
        {
          title: "全部",
          id: 1,
        },
        {
          title: "彩妆衣橱",
          id: 2,
        },
        {
          title: "奢宠护肤",
          id: 3,
        },
        {
          title: "香水衣橱",
          id: 4,
        },
        {
          title: "限量礼盒",
          id: 5,
        },
      ],
    };
  },
  methods: {
    //获取当前搜索框的滚动内容
    getGoodsInfo(currentContent, number) {
      console.log("currentContent", currentContent);
      console.log("number", number);
    },
    //获取滚动公告的内容
    async getNoticeDate() {
      const { data } = await this.$request.get("/getIndex/msg/msgDatalist");
      const res = JSON.parse(data.data[0].content);
      this.NoticeDate = res.dataList;
      console.log(" this.NoticeDate", this.NoticeDate);
    },
    //点击公告时,当前公告的productCode
    getNoticeInfo(productCode) {
      if (!productCode) {
        return;
      }
      //跳转到商品详情页
      this.$router.push({
        name: "details",
        params: {
          productCode,
        },
      });
    },
    fn1(value) {
      console.log("value", value);
    },
  },
  watch: {},
  components: { InputPlaceHolder },
};
</script>


<style lang="scss">
.van-notice-bar {
  margin-top: 15px;
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
}

.van-sidebar {
  text-align: center;
  color: black;

  .van-sidebar-item--select::before {
    left: 20px;
    background-color: rgb(182, 25, 25);
  }
}
</style>