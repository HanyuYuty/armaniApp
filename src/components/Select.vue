<template>
  <div>
    <select name="" id="" @change="getOptions">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["id"],
  
  created() {
      
      //this.$store.commit('Cart/currentQty',this.id)
  },
  mounted() {
     
  },
  updated() {},
  data() {
    return {
      
    };
  },
  methods: {
    getOptions(e) {
        this.value = e.target.value;
      this.$emit("change", e.target.value, this.id);
     
    },
  },
  watch:{
    
  }
};
</script>

<style lang="scss">
select {
  width: 10vw;
  height: 3vh;
  margin-bottom: 10px;
  position: relative;
  option {
    position: absolute;
    top: 10px;
  }
}
</style>