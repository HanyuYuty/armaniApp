<template>
  <div id="login">
    <header>
      <div class="logo">
        <img :src="$src" alt="logo" />
      </div>
      <div class="line"></div>
    </header>
    <van-form @submit="onBlur">
      <h1 class="titles">创建账户</h1>
      <van-field
        v-model="username"
        type="username"
        name="username"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="phoneNumber"
        name="phoneNumber"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
        @change="validation"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <h4 class="titles">您的生日</h4>
      <van-cell title="选择日期" :value="text" @click="show = true" />
      <van-datetime-picker
        v-if="show == true"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
        @cancel="show = false"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >立即注册</van-button
        >
      </div>
    </van-form>

    <h4 class="titles">已有账号</h4>
    <van-button
      block
      type="info"
      native-type="submit"
      class="reg"
      @click="goToLogin"
      >登录</van-button
    >
  </div>
</template>


<script>
export default {
  created() {},
  data() {
    return {
      username: "",
      password: "",
      phoneNumber: "",
      radio: 2,
      text: "",
      show: false,
      minDate: new Date(1960, 0, 31),
      maxDate: new Date(),
      currentDate: new Date(2022, 3, 20),
      checkboxGroup: [],
      phoneNumberCheck: false,
    };
  },
  methods: {
    async onBlur(values) {
      values.birthday = this.text;
    if(this.phoneNumberCheck==false){
      this.$toast.fail('请输入未注册手机号');
      return
    }
    const { data } = await this.$request.post("/users/register", values);
      if (data.code == 200) {
        this.$router.push({
          path: "/login",
          query: { username: values.username },
        });
        this.$toast.success('注册成功');
      }
   
    },
    goToLogin() {
      this.$router.push("/login");
    },
    confirm(value) {
      this.show = false;
      this.text = this.formatDate(value);
    },
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    validation(e) {
      this.$request
        .get("/users/check", {
          params: { phoneNumber: e.target.value },
        })
        .then(({ data }) => {
          if (data.code == 400) {
            this.$toast.fail("该手机号码已被注册");
            this.phoneNumberCheck = false;
          }else{
            this.phoneNumberCheck=true;
          }
        });
    },
  },
  watch: {
    radio(n) {
      console.log("n", n);
    },
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
    margin: 100px auto 0px;
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
  .group {
    .van-field__control {
      background: #fff;
      border: 0px;
      border: none;
    }
  }
  .titles{
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }
}
</style>