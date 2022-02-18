<template>
  <div class="colortype" ref="div">
    <img
      :src="colortype.variantIcon || ' '"
      alt=""
      :style="{
        backgroundColor: colortype.variantColor || ' '
      }"
      class="currentImg"
      @click="text(colortype.variantFirstCustValue, $event)"
    />
  </div>
</template>


<script>
export default {
  props: ["colortype"],
  created() {
   
    
  },
  mounted(){
   
  },

  activated() {
    //this.text(this.colortype.variantFirstCustValue)
  },
  deactivated() {},

  methods: {
    text(value, e) {
     
      // e.target.parentElement.style.border = "";
      // e.target.parentElement.style.border = " 1px solid black";
      console.log('colortype',this.colortype);
      this.$emit("click", value);
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