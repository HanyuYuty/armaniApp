<template>
  <div class="incart">
    <h3>我的购物车</h3>
    <div class="all_goods">
      <van-checkbox v-model="checked" shape="square" icon-size="14px"
        >全部商品</van-checkbox
      >
    </div>
    <van-row gutter="1">
      <van-col span="2"><van-checkbox v-model="checked" shape="square" icon-size="14px"></van-checkbox
      ></van-col>
      <van-col span="22">
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        />
      </van-col>
    </van-row>
  </div>
</template>



<script>
export default {
  created() {},
  data() {
    return {
      checked: false,
    };
  },
};
</script>

<style lang="scss">
.incart {
  margin-top: 145px;
  h3 {
    margin-bottom: 30px;
  }
  .all_goods {
    width: 100%;
    height: 4vh;
    background: rgb(243, 243, 243);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 10px;
    font-size: 14px;
  }
}
</style>


