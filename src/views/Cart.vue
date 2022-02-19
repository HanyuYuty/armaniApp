<template>
  <div class="cart">
    <header>
      <div class="logo">
        <img
          src="	https://www.giorgioarmanibeauty.cn/img/logo.62aebeab.png"
          alt="logo"
        />
      </div>
      <div class="line"></div>
      <Step></Step>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import Step from "../components/Step.vue";
export default {
  data() {
    return {
      active: 1,
    };
  },
  methods: {},
  components: { Step },
};
</script>




<style lang="scss">
.cart {
   height: 100%;
   overflow-y:scroll ;
  header {
    position: fixed;
    top: 0px;
    left: 0px;
  }
  .logo {
    text-align: center;
    margin-top: 20px;
    img {
      width: 60%;
      height: 60%;
    }
  }
  .line {
    width: 100%;
    height: 2px;
    background: #000;
    margin-top: 5px;
  }
}
</style>