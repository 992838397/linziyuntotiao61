<template>
  <div class="comment">
    <gz_header title="个人评论">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </gz_header>
    <div class="item" v-for="value in userComment" :key="value.id">
      <div class="head">
        <img :src="axios.defaults.baseURL + value.user.head_img" alt />
        <div>
          <p>{{ value.user.nickname }}</p>
          <span>时间</span>
        </div>
        <span @click="replayComment(value)">回复</span>
      </div>

      <!-- 子组件传递给父组件,父组件在传递回子组件,省了兄弟传值 -->
      <gz_commentItem
        v-if="value.parent"
        :parent="value.parent"
        @replay="replayComment"
      ></gz_commentItem>
      <div class="text">{{ value.content }}</div>
    </div>

    <!-- 底部评论 -->
    <gz_commentFooter
      :post="article"
      @refresh="refresh"
      :commentObj="temp"
      @cancel="temp = null"
    ></gz_commentFooter>
  </div>
</template>

<script>
import gz_header from "@/components/gz_header";
import { getUsercomment } from "@/apis/user.js";
import { geteditList } from "@/apis/post.js";
import axios from "@/utils/request";
import gz_commentItem from "@/components/gz_commentItem";
import gz_commentFooter from "@/components/gz_commentFooter";
export default {
  components: {
    gz_header,
    gz_commentItem,
    gz_commentFooter,
  },
  data() {
    return {
      userComment: [],
      axios,
      article: {},
      temp: {},
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    // 复用性 封装
    async init() {
      // 获取文章详情数据
      let id = this.$route.params.id;
      this.article = (await geteditList(id)).data.data;
      //   获取文章评论列表数据
      let res = await getUsercomment(id);
      console.log(res);
      this.userComment = res.data.data;
    },

    // 子组件 发出请求,父子间刷新页面 重新调用数据
    refresh() {
      console.log(31231231);
      this.init();
      // 列表回到第一页
      window.scrollTo(0, 0);
      // 让列表自动的滚动到顶部
    },
    replayComment(v) {
      console.log("这是父组件的", v);
      this.temp = v;
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px 10px;
  border-bottom: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>