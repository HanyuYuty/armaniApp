<template>
  <div class="component_input">
    <input
      type="text"
      @input="isValue"
      @click="clearInterval"
      @blur="starInterval"
      
      ref="input"
    />
    <span
      class="com-input"
      ref="spanPlace"
      v-if="typeof(placeholderString) == 'string' && placeholderString"
    >{{getPlaceholder}}</span>
    <span id="box" ref="spanPlace" v-else>
      <ul id="con1" ref="con1" :class="{ anim: animate == true }">
        <li v-for="item in placeholderValue" :key="item">{{ item }}</li>
      </ul>
    </span>
  </div>
</template>



<script>
export default {
  props: {
    placeholder: [Array, String, Number],
    
  },
  created() {
    this.getPlaceholder;
    this.isScroll = setInterval(this.scroll, 2000);
  },

  data() {
    return {
      placeholderValue: [], //针对props是数组时的数据初始值。
      animate: false, //是否添加类名
      isScroll: "",
      currentContent: "",
      placeholderString:''
    };
  },
  methods: {
    //获取焦点时，取消定时器
    clearInterval() {
      clearInterval(this.isScroll);
      //触发父组件的search事件，并把不再滚动的值传过去。
      this.$emit("search", this.currentContent);
    },
    //输入内容时，取消定时器并把节点隐藏。
    isValue(e) {
      if (e.target.value) {
        this.$emit('input',e.target.value)
        clearInterval(this.isScroll);
        this.$refs.spanPlace.style = "display:none";
      } else {
        this.$refs.spanPlace.style = "display:inline";
        // setInterval(this.scroll, 2000);
      }
    },
    //失焦时，重启定时器。
    starInterval() {
      // ⭐⭐注意，重启定时器是重启同一个，this.isScroll是该定时器的标识，不加该标识会重开新定时器
      this.isScroll = setInterval(this.scroll, 2000);
    },
    //定时器内部处理，实现滚动效果。
    scroll() {
     
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        this.placeholderValue.push(this.placeholderValue[0]); // 将数组的第一个元素添加到数组的
        this.placeholderValue.shift(); //删除数组的第一个元素
        this.animate = false;
      },1000);
    },
  },
  computed: {
    //计算传入的值，是否是array。
    getPlaceholder() {
    
      if (
        Object.prototype.toString.call(this.placeholder) == "[object Array]"
      ) {
        
        if(this.placeholder.filter(item=>typeof(item)=="object")){
          this.placeholderValue = this.placeholder.map(item=>item.goodsname);

        }else{
          this.placeholderValue=this.placeholder
        }
        
      } else {
        return (this.placeholderString = this.placeholder);
      }
    },
  },
  watch: {
    //监听placeholderValue变化
    placeholderValue(n, o) {
      if (n) {
        this.currentContent = n[0];
      }
    },
   
  },
  //离开组件就停止定时器
  destroyed() {
    clearInterval(this.isScroll);
  },
  
};
</script>


<style lang="scss">
input {
  background: #faf7f7;
  outline: none;
  width: 94vw;
  height: 4vh;
  border: 0px;
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
}
#box {
  position: absolute;
  left: 0px;
  top: 17px;
  height: 20px;
  overflow: hidden;
  color: #b4b4b4;
  padding-left: 20px;
}
.anim {
  transition: all .5s;
  transform: translateY(-20px);
}
.com-input{
   position: absolute;
  left: 0px;
  top: 7px;
  color: #b4b4b4;
}

// #con1 li {
//   list-style: none;
//   line-height: 30px;
//   height: 30px;
// }
// .anim {
//   position: absolute;
//   left: 0px;
//   top: 7px;
//   -webkit-animation: anim 4s linear 1 forwards;
//   animation: anim 4s linear 1 forwards;
//   color: red;
// }
// input::-webkit-input-placeholder {
//     color: red;
//     -webkit-animation: anim 4s linear 1 forwards;
//     animation: anim 4s linear 1 forwards;
// }

// @keyframes anim {
//   0% {
//     --main-text-color: rgba(0, 0, 255, 0.2);
//   }

//   70% {
//     --main-text-color: rgba(255, 0, 0, 1);
//   }

//   100% {
//     --main-text-color: rgba(0, 0, 255, 0.5);
//   }
// }
</style>