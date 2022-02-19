<template>
  <div id="login">
    
    <header>
      <div class="logo">
        <img :src="$src" alt="logo" />
      </div>
      <div class="line"></div>
    </header>
    
    <van-form @submit="onSubmit">
          <h1>请登录</h1>
      <van-field
        v-model="username"
        name="phone"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="onSubmit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-button block type="info" native-type="submit" class="reg" @click="goToReg"
      >注册</van-button
    >
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
    goToReg(){
        this.$router.push('/register')
    }
  },
};
</script>

<style lang="scss">
#login {
  height: 100%;
  overflow-y: scroll;
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
  .van-form {
    margin: 150px auto 0px;
  }
  .van-form {
    .van-field__control {
      height: 6vh;
      border: 1px solid rgb(145, 145, 145);
      text-indent: 2em;
    }

    .van-field__control {
      background: rgb(241, 241, 241);
    }

    .van-button {
      border-radius: 0px;
      background: #000;
      border: 0px;
      margin-bottom: 5px;
    }
  }
  .reg {
    width: 92vw;
    border-radius: 0px;
    background: #000;
    border: 0px;
    margin-bottom: 5px;
    margin-left: 16px;
  }
}
</style>