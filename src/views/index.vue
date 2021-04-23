<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" />
      </div>
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <gz_post
          v-for="item in cate.postList"
          :key="item.id"
          :post="item"
        ></gz_post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCatelist } from "@/apis/category.js";
import { getNewslist } from "@/apis/post.js";
import gz_post from "@/components/gz_post.vue";
export default {
  data() {
    return {
      // 当前被选中active索引值
      active: localStorage.getItem("heimatotiao_token") ? 1 : 0,
      cateList: [], //这是栏目列表数据
      //   newsList: [], //这是栏目新闻列表数据
    };
  },
  components: {
    gz_post,
  },

  async mounted() {
    // 页面一刷新就加载
    //   获取栏目数据
    let res = await getCatelist();
    this.cateList = res.data.data;

    // 这里实现了 cateList添加了一个新的属性,用来存储发送请求成功后的数组,实现避免重复请求
    this.cateList = this.cateList.map((v) => {
      return { ...v, postList: [] };
    });
    console.log("这是栏目", this.cateList);

    this.getPost();
  },
  watch: {
    //   监听active的变化
    async active() {
      // 如果数组中已经存在数数据,就没有必要重复发送请求
      if (this.cateList[this.active].postList.length == 0) {
        this.getPost();
      }
    },
  },
  methods: {
    //这是发送请求获取到新闻列表数据,id是根据索引值获取的
    //   let res = await getNewslist(id);
    //   this.newsList = res.data.data;
    //   console.log("这是newList", this.newsList);
    async getPost() {
      // 获取当前被激活栏目的新闻数据
      // 根据索引值到获取到的数据中cateList中匹配,然后拿到id
      let id = this.cateList[this.active].id;
      let res = await getNewslist(id);
      this.cateList[this.active].postList = res.data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 50px;
    background-color: #f00;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .logo {
      color: #fff;
      .iconnew {
        font-size: 50px;
      }
    }
    .search {
      flex: 1;
      height: 40px;
      margin-top: 5px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.6);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
    }
    .user {
      color: #fff;
      font-size: 30px;
    }
  }
}
</style>