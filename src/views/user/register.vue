<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <!-- <input placeholder="手机号码" class="input" /> -->
      <gz_input
        v-model="user.username"
        placeholder="手机号码"
        :rules="/^1[35789]\d{9}$|^1\d{4}$/"
        msg="请输入11位手机号码"
      ></gz_input>
      <gz_input placeholder="昵称" v-model="user.nickname"></gz_input>
      <gz_input
        v-model="user.password"
        placeholder="请输入密码"
        :rules="/^.{6,12}$/"
        msg="请输入密码6~12位区间"
      ></gz_input>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <gz_buttom type="primary" @click="register">注册</gz_buttom>
  </div>
</template>

<script>
import gz_buttom from "@/components/gz_buttom";
import gz_input from "@/components/gz_input";
import { userRegister } from "@/apis/user.js";
export default {
  components: {
    gz_buttom,
    gz_input,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  methods: {
    register() {
      userRegister(this.user)
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>