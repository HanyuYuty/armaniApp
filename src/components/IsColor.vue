<template>
  <div class="colortype" ref="div">
    <!-- <img
      v-if="colortype"
      :src="colortype.variantIcon || ' '"
      alt=""
      :style="{
        backgroundColor: colortype.variantColor || ' ',
      }"
      class="currentImg"
      @click="text(colortype.variantFirstCustValue, $event)"
    />

    <img
      v-else
      :src="childreninfo.variantIcon || ' '"
      alt=""
      :style="{
        backgroundColor: childreninfo.variantColor || ' ',
      }"
      class="currentImg"
    /> -->
    <!-- <slot name="goods-label"></slot> -->

    <img
      :src="skuOrDefaultSrc(colortype || childreninfo)"
      alt=""
      :style="{
        backgroundColor: skuOrDefaultBg(colortype || childreninfo),
      }"
      class="currentImg"
      @click="text(colortype||childreninfo, $event)"
    />
    <slot name="goods-label"></slot>
  </div>
</template>


<script>
export default {
  props: ["colortype", "childreninfo"],
  created() {},
  mounted() {
    document.querySelector(".colortype").style.border = " 2px solid black";
  },

  activated() {},
  deactivated() {},

  methods: {
    text(value, e) {

      //获取该组件中全部div节点，把他们遍历并进行去除样式。
      const divs = document.querySelectorAll(".colortype");
      divs.forEach((item) => (item.style.border = ""));
      //点击之后，样式显示。
      e.target.parentElement.style.border = " 2px solid black";
      // 根据传入的不同数据，返回不同值
      this.$emit("click", value.variantFirstCustValue, this.colortype || this.childreninfo);
    },

    // 判断规格是否是链接
    skuOrDefaultSrc(type) {
      return type.variantIcon ? type.variantIcon : " ";
    },
    // 判断规格是否是颜色
    skuOrDefaultBg(type) {
      return type.variantColor ? type.variantColor : " ";
    },
  },
  watch: {},
};
</script>


<style lang="scss">
.colortype {
  display: inline-block;
  width: 10vw;
  height: 5vh;
  margin-right: 5vw;
  //border: 1px solid black;

  //height: 10vh;
  .currentImg {
    width: 95%;
    height: 95%;
    transform: translate(3%, 5%);
  }
}
</style>