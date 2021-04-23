<template>
  <div class="personal">
    <router-link :to="`/edit_profile/${id}`">
      <div class="profile">
        <img :src="userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: userinfo.gender == 1,
                iconxingbienv: userinfo.gender == 0,
              }"
            ></span
            >{{ userinfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
      np,
    </router-link>
    <gz_celi title="我的关注" msg="关注的用户"></gz_celi>
    <gz_celi title="我的跟帖" msg="跟帖/回复"></gz_celi>
    <gz_celi title="我的收藏" msg="文章/视频"></gz_celi>
    <gz_celi title="设置"></gz_celi>
    <gz_buttom type="danger" style="margin-top: 20px">退出</gz_buttom>
  </div>
</template>

<script>
import gz_celi from "@/components/gz_celi.vue";
import gz_buttom from "@/components/gz_buttom.vue";
import { getuserInfo } from "@/apis/user.js";
import axios from "@/utils/request.js";
export default {
  data() {
    return {
      userinfo: {},
      id: "",
    };
  },
  components: {
    gz_celi,
    gz_buttom,
  },
  mounted() {
    // $route.params可以获取到路由参数
    this.id = this.$route.params.id;
    getuserInfo(this.id)
      .then((res) => {
        console.log(res);
        // 进行数据渲染
        this.userinfo = res.data.data;
        // 数据改造,在图片之前拼接基准路径
        this.userinfo.head_img =
          axios.defaults.baseURL + this.userinfo.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>