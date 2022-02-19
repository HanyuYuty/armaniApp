<template>
  <div class="incart">
    <h3>我的购物车</h3>
    <div class="all_goods">
      <van-checkbox v-model="checked" shape="square" icon-size="16px"
        >全部商品</van-checkbox
      >
    </div>
    <van-row gutter="1" v-for="item in cartList" :key="item.id">
      <van-col span="2">
        <van-checkbox-group v-model="radios" class="group">
          <van-checkbox :name="item.id" shape="square"  icon-size="16px"></van-checkbox>
        </van-checkbox-group>
      </van-col>
      <van-col span="22">
        <van-card
          :num="item.qty"
          :price="item.channelPrice * item.qty"
          :desc="item.variantFirstCustValue"
          :title="item.baseProductName"
          :thumb="item.productImageDefault"
        >
          <template #title>
            <span>{{ item.baseProductName }}</span>
            <van-icon
              name="delete-o"
              size="1.5rem"
              class="del"
              @click="getCurrentGoods(item.id)"
            />
          </template>
          <template #price-top>
          <Select @change="getCurrentOptions" :id="item.id"></Select>
          </template>
        </van-card>
        <van-divider />
      </van-col>
    </van-row>

    <van-submit-bar button-text="提交订单" @submit="onSubmit" class="cart_bar">
      <template #default>
        <div class="price">总价:￥{{ price }}</div>
        <div class="go_on" @click="gotoHome">继续购物</div>
      </template>
      <template #button>
        <div class="settlement" @click="gotoCheck">立即结算</div>
      </template>
    </van-submit-bar>
  </div>
</template>



<script>
import { mapState } from "vuex";
import Select from "../../components/Select.vue"
import Mymixins from "../../mixin/Mymixins"
export default {
    name:"Incart",
    mixins:[Mymixins],
  created() {},
  data() {
    return {
      radios: [],
    };
  },
  computed: {
    ...mapState("Cart", ["cartList"]),
    //是否全选
    checked: {
      get() {
        //通过跟购物车的数据进行对比，当选中一个商品时，会给this.radios追加它的name值，所以只要确认radios是否跟cartList能完全配对即可。
        return this.cartList.every((item) => this.radios.includes(item.id));
      },
      set(n) {
        return (this.radios = n ? this.cartList.map((item) => item.id) : []);
      },
    },

    //总价
    price() {
      return this.cartList
        .filter((item) => this.radios.includes(item.id))
        .reduce((pre, item) => pre + item.channelPrice * item.qty, 0);
    },
  
 
   
  },
  methods: {
    //点击删除当前商品
    getCurrentGoods(id) {
     this.$store.commit('Cart/deleteGoods',id)
    },
    onSubmit() {},
    //选择商品数量
    getCurrentOptions(value,id){
        this.$store.commit('Cart/addQty',{value,id})
    },
    //继续购物
    gotoHome(){
        this.$router.push('/home')
    },
    //结算
    gotoCheck(){
        this.$router.push({
           name:'checkout',
            params:{
                price:this.price
            }
            
        })
    }
  },
  watch: {
    value(n) {
      console.log("value.n", n);
    },
  },
  components:{Select}
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
  .van-card {
    background: #fff;
  }
  .del {
    position: fixed;
    left: 22.2rem;
  }
  .cart_bar {
    background: rgb(155, 155, 155);
    color: rgb(255, 255, 255);
    font-weight: 500;
    height: 55px;
    .van-submit-bar__bar {
      height: 100%;
      padding: 0px;
      align-items: center;
      div {
        flex: 1;
        height: 100%;
        text-align: center;
        line-height: 6vh;
      }
      div:nth-child(1) {
        flex: 1.2;
      }
      div:nth-child(2) {
        background: #000;
      }
      div:nth-child(3) {
        background: rgb(139, 14, 14);
      }
    }
  }
  .group{
     margin-left: 10px;
     margin-top: 38px;
  }
}
</style>


