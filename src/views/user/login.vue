<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <!-- <input placeholder="请输入手机号" class="input" /> -->
        <gz_input
          v-model="user.username"
          placeholder="请输入手机号/账户"
          :rules="/^1\d{10}$|^1\d{4}$/"
          msg="请输入11位手机号:"
        ></gz_input>
        <gz_input
          v-model="user.password"
          placeholder="请输入密码"
          :rules="/^.{3,16}$/"
          msg="请输入3-16位密码"
        ></gz_input>
        <!-- <input placeholder="密码" class="input" type="password" /> -->
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- 父组件设置点击事件时没有反应,有个注意点: -->
      <gz_buttom @click="login" type="primary">登录</gz_buttom>
    </div>
  </div>
</template>

<script>
import gz_buttom from "@/components/gz_buttom.vue";
import gz_input from "@/components/gz_input.vue";
import { userLogin } from "@/apis/user.js";
export default {
  data() {
    return {
      user: {
        username: "13035808046",
        password: "116616",
      },
    };
  },
  components: {
    gz_buttom,
    gz_input,
  },
  methods: {
    login(e) {
      if (
        /^1\d{10}$|^admin$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.password)
      ) {
        userLogin(this.user)
          .then((res) => {
            if (res.data.message == "登录成功") {
              console.log(res.data.data.user.id);
              // 存储token,到个人中心验证是否存在
              localStorage.setItem("heimatotiao_token", res.data.data.token);
              // 实现路由跳转  传递具体用户信息,用户ID
              this.$router.push({ path: `/personal/${res.data.data.user.id}` });
              // console.log(res);
            } else {
              this.$toast.fail("登录失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail("用户名或密码错误");
      }
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