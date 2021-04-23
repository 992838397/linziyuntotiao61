<template>
  <div class="edit_profile">
    <gz_header title="个人信息编辑">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </gz_header>
    <div class="edit_img">
      <img :src="userinfo.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 输入框 -->

    <!-- 修饰符.native 监听组件根元素的原生事件 -->
    <gz_celi
      title="昵称"
      :msg="userinfo.nickname"
      @click.native="showNicknameDialog"
    >
    </gz_celi>
    <van-dialog
      v-model="nickshow"
      title="编辑昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" label="昵称" placeholder="请输入用户名" />
    </van-dialog>
    <gz_celi title="密码" msg="******" @click.native="passWord"> </gz_celi>
    <van-dialog
      v-model="password"
      title="编辑密码"
      show-cancel-button
      @confirm="editPass"
      :beforeClose="beforeClose"
    >
      <van-field v-model="originPass" label="原密码" placeholder="原密码" />
      <van-field v-model="newPass" label="新密码" placeholder="新密码" />
    </van-dialog>
    <gz_celi
      title="性别"
      :msg="userinfo.gender == 1 ? '男' : '女'"
      @click.native="genderShow = !genderShow"
    ></gz_celi>
    <van-action-sheet
      v-model="genderShow"
      :actions="actions"
      @select="onSelect"
      :close-on-click-action="true"
    />
  </div>
</template>
<script>
import gz_header from "@/components/gz_header.vue";
import gz_celi from "@/components/gz_celi.vue";

import { uploadFile } from "@/apis/fileUpload";
import { updateUserDetail, getuserInfo } from "@/apis/user";
import axios from "@/utils/request";
export default {
  data() {
    return {
      userinfo: {},
      nickshow: false,
      password: false,
      genderShow: false,
      //   用户昵称
      nickname: "",
      // 原密码
      originPass: "",
      newPass: "",
      // 这是选项中的数据  只能是数组对象形式
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  components: {
    gz_header,
    gz_celi,
  },
  mounted() {
    getuserInfo(this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.userinfo = res.data.data;
        this.userinfo.head_img =
          axios.defaults.baseURL + this.userinfo.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    //   当用户选择好文件之后,就会立即触发这个方法,在这个方法中实现文件的上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log("这是:", file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      //   文件上传
      uploadFile(formdata)
        .then((res) => {
          console.log(res);
          if (res.data.message == "文件上传成功") {
            // 页面刷新,就是将img的src属性的值动态修改
            // 1.这是获取到url
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;
            // 编辑用户头像信息
            // 存储在数据表中的头像信息，只有目录+文件名称，并没有基准路径
            // 2，实现用户头像的编辑
            updateUserDetail(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                console.log(res);
                this.$toast.success(res.data.message);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 实现模态框弹出以及赋值
    showNicknameDialog() {
      this.nickshow = !this.nickshow;
      //   此处点击之后赋值给文本框
      this.nickname = this.userinfo.nickname;
    },
    // 编辑昵称
    editNickname() {
      updateUserDetail(this.$route.params.id, { nickname: this.nickname })
        .then((res) => {
          console.log(res);
          this.$toast.success(res.data.message);
          //   所谓刷新是将元素所绑定的数据更新;
          this.userinfo.nickname = this.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 弹出密码模态框
    passWord() {
      this.password = !this.password;
      this.originPass = this.newPass = "";
    },
    // 编辑密码
    async editPass() {
      console.log(this.userinfo.password);
      // 1.判断原密码是否正确
      if (this.originPass == this.userinfo.password) {
        //这是输入正确的
        // 2.判断新密码是否符合规则
        if (/^.{6,12}$/.test(this.newPass)) {
          let res = await updateUserDetail(this.$route.params.id, {
            password: this.newPass,
          });
          console.log(res);
          // 实时更新密码,页面不用刷新一次
          this.userinfo.password = this.newPass;
          this.$toast.success(res.data.message);
        }
      } else {
        this.$toast.fail("原密码输入不正确");
      }
    },
    // 密码错误弹出框不关闭
    beforeClose(action, done) {
      console.log(action);
      if (action == "confirm") {
        // 原密码和新密码输入不正确,弹出框不关闭,正确才关闭
        if (
          this.originPass !== this.userinfo.password ||
          !/^.{6,12}$/.test(this.newPass)
        ) {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },

    // 修改性别
    async onSelect(item) {
      console.log(item);
      let gender = item.name == "男" ? 1 : 0;
      console.log(gender);
      let res = await updateUserDetail(this.$route.params.id, { gender });
      this.$toast.success("修改成功");
      // 实现页面刷新,也就是数据更新
      this.userinfo.gender = gender;
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.edit_img {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  position: relative;

  img {
    width: 120px;
    height: 120px;
  }
  //    /deep/ 是父组件影响子组件更深入一点   因为加了scoped
  /deep/.van-uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  /deep/.van-uploader__upload {
    width: 120px;
    height: 120px;
  }
}
</style>