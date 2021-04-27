<template>
  <div class="myfollow">
    <gz_header title="我的关注">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </gz_header>
    <div class="list" v-for="value in postFollow" :key="value.id">
      <div class="box">
        <img :src="value.head_img" alt="" />
        <div class="center">
          <p>{{ value.nickname }}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="cancleFollow(value.id, index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import gz_header from "@/components/gz_header.vue";
import { getUserfollow, upfollowUser } from "@/apis/user.js";
import axios from "@/utils/request";
export default {
  data() {
    return {
      postFollow: {},
    };
  },
  components: {
    gz_header,
  },
  async mounted() {
    // 获取关注列表
    let id = this.$route.params.id;
    let res = await getUserfollow(id);
    this.postFollow = res.data.data;
    this.postFollow = this.postFollow.map((v) => {
      axios.defaults.baseUR;
      v.head_img = axios.defaults.baseURL + v.head_img;
      return v;
    });
    console.log(res);
  },
  methods: {
    async cancleFollow(id, index) {
      let res = await upfollowUser(id);
      // 删除指定的下表
      this.postFollow.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>