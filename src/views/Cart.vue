<template>
  <div class="cart">
    <header>
      <div class="logo">
        <img :src="$src" alt="logo" />
      </div>
      <div class="line"></div>
      <Step ref="step"></Step>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import Step from "../components/Step.vue";
export default {
  mounted() {},
  data() {
    return {
      active: 1,
    };
  },
  methods: {},
  watch: {
    //😵
   "$route.name": function (n) {
      if (n == "incart") {
        this.$refs.step.$el.firstElementChild.style.color = "black";
        this.$refs.step.$el.firstElementChild.lastElementChild.style.backgroundColor =
          "black";
           this.$refs.step.$el.lastElementChild.style.color = "rgb(223, 223, 223)";
        this.$refs.step.$el.lastElementChild.lastElementChild.style.backgroundColor =
          "rgb(223, 223, 223)";
      }
      if (n.includes("checkout")) {
        this.$refs.step.$el.lastElementChild.style.color = "black";
        this.$refs.step.$el.lastElementChild.lastElementChild.style.backgroundColor =
          "black";
        this.$refs.step.$el.firstElementChild.style.color =
          "rgb(223, 223, 223)";
        this.$refs.step.$el.firstElementChild.lastElementChild.style.backgroundColor =
          "rgb(223, 223, 223)";
      } 
    },
  },
  components: { Step },
};
</script>




<style lang="scss">
.cart {
  height: 100%;
  overflow-y: scroll;
  
  header {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
    background: rgb(255, 255, 255);
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