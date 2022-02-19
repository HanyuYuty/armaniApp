<template>
  <div class="step">
    <div ref="div_one">
      <span>我的购物车</span>
      <span class="a_line" ref="span_one"></span>
    </div>
    <div>
      <span>提交订单</span>
      <span class="a_line"></span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    console.log("route", this.$route.name);
    if (this.$route.name == "incart") {
      this.$refs.div_one.style.color = "black";
      this.$refs.span_one.style.backgroundColor = 'black'
    }
  },
};
</script>

<style lang="scss">
.step {
  padding: 0px 20px;
  box-sizing: border-box;
  //   display: flex;
  //   justify-content: space-around;
  //   align-items: center;
  div {
    margin-top: 15px;
    float: left;
    text-align: center;
    display: flex;
    flex-direction: column;
    color: rgb(223, 223, 223);
    span:nth-child(1) {
      vertical-align: bottom;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 14px;
    }
    .a_line {
      display: inline-block;
      width: 40vw;
      height: 0.5px;
      background: rgb(223, 223, 223);
    }
  }
  div:nth-child(1) {
    margin-right: 25px;
  }
}
</style>