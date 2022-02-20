<template>
  <div>
    <div class="status" v-if="getLoadingState">
      <Loading></Loading>
    </div>
    <header>
      <InputPlaceHolder
        :placeholder="hotSearch"
        @search="getGoodsInfo"
        @input="fn1"
      ></InputPlaceHolder>
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
    </header>
    <van-row gutter="20">
      <van-col span="6">
        <aside>
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              :title="item.title"
              v-for="item in sidebarList"
              :key="item.id"
              :to="host + item.path"
            />
          </van-sidebar>
        </aside>
      </van-col>
      <van-col span="18">
        <router-view></router-view>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import InputPlaceHolder from "../components/Myinput.vue";
import Mymixins from "../mixin/Mymixins";
export default {
  mixins: [Mymixins],
  created() {
    
    this.getNoticeDate();
  },
  data() {
    return {
      value: "",
      NoticeDate: [], //公告栏初始
      activeKey: 0,
      host: "/goods",
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
          path: "/",
        },
        {
          title: "彩妆衣橱",
          id: 2,
          path: "/makeup",
        },
        {
          title: "奢宠护肤",
          id: 3,
          path: "/skincare",
        },
        {
          title: "香水衣橱",
          id: 4,
          path: "/fragrance",
        },
        {
          title: "限量礼盒",
          id: 5,
          path: "/others",
        },
      ],
    };
  },
  methods: {
    //获取当前搜索框的滚动内容
    getGoodsInfo(currentContent) {
      console.log("currentContent", currentContent);
    },
    //获取滚动公告的内容
    async getNoticeDate() {
      const { data } = await this.$request.get("/getIndex/msg/msgDatalist");
      data.code == 200 ? this.$store.commit("Loading/hideLoading") : "";
      const res = JSON.parse(data.data[0].content);
      this.NoticeDate = res.dataList;
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
  .van-sidebar-item {
    padding: 30px 15px;
  }
  .van-sidebar-item--select::before {
    left: 20px;
    background-color: rgb(182, 25, 25);
  }
}
.van-col {
  padding: 0px !important;
}

header,
aside {
  position: fixed;
  z-index: 10;
  background: white;
}
header {
}
aside {
  top: 110px;
  height: 684px;
  .van-sidebar {
    height: 100%;
    background-color: #f7f8fa;
  }
}
</style>