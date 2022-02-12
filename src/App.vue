<template>
  <div class="bottomBar">
    <van-nav-bar
  title="阿玛尼美妆官方精品商城"
/>

        <!-- 底部导航 -->
    <van-tabbar v-model="active" active-color="#fff" inactive-color="rgb(112, 112, 112)">
      <van-tabbar-item icon="home-o" size="25" to="/home">
          <span>首页</span>
        <template #icon>
          <i class="iconfont icon-MAC"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="apps-o" size="25" to="/goods" color="black">全部商品</van-tabbar-item>
      <van-tabbar-item size="25">
           <span>独家臻礼</span>
        <template #icon>
            <iconfont-heart></iconfont-heart>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :badge="0" size="25"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="contact" size="40">个人中心</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>

</template>


<script>
import iconfontHeart from "./iconfont/heart.vue"
export default {
  data() {
    return {
      active: 0,
    }
   
  },
  methods:{
   

  },
   components:{iconfontHeart}
};
</script>


<style lang="scss">
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.van-nav-bar__content{
  background: black;
  .van-nav-bar__title{
    color: white;
  }
}

</style>