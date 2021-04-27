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
        <van-icon name="manager-o" @click="juom" />
      </div>
    </div>
    <van-tabs v-model="active" sticky swipeable @change="getactive">
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <van-list
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          :immediate-check="false"
          :offset="5"
          @load="onLoad"
        >
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <gz_post
              v-for="item in cate.postList"
              :key="item.id"
              :post="item"
            ></gz_post>
          </van-pull-refresh>
        </van-list>
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
      // catePostlist: [], //这是栏目新闻列表数据
    };
  },
  components: {
    gz_post,
  },

  async mounted() {
    // // 页面一刷新就加载
    // //   获取栏目数据
    let res = await getCatelist();
    this.cateList = res.data.data;
    // // 这里实现了 cateList添加了一个新的属性,用来存储发送请求成功后的数组,实现避免重复请求
    // this.cateList = this.cateList.map((v) => {
    //   return { ...v, postList: [] };
    // });
    // console.log("这是栏目", this.cateList);
    // this.getPost();

    // 这是第二种实现方式
    // 页面一加载,默认先加载头条数据
    // let id = this.cateList[this.active].id;
    // let dres = await getNewslist(id);
    // this.cateList[this.active].postList = dres.data.data;
    // console.log(this.cateList);

    // 数据改造   重复发送请求,不合理
    this.cateList = this.cateList.map((v) => {
      return {
        ...v,
        postList: [],
        pageIndex: 1, //当前栏目页码
        pageSize: 6, //当前栏目每页显示的数量
        loading: false, //当前组件的上拉加载的状态
        finished: false, //当前组件的数据是否全部加载完毕的标记
        isLoading: false, //当前组件的下拉加载状态
      };
    });
    console.log(this.cateList);
    // let resd = await getNewslist(id);
    // this.cateList[this.active].postList = resd.data.data;
    this.getPost();
  },

  methods: {
    // 点击个人中心图标跳转

    juom() {
      let id = localStorage.getItem("heimatotiao_userid");
      if (id) {
        this.$router.push({ path: `/personal/${id}` });
      } else {
        this.$router.push({ name: "login" });
        this.$toast.fail("未登录,请去登录");
      }
    },
    // 1.上拉加载下一页
    onLoad() {
      // 1.1 页码+1，
      this.cateList[this.active].pageIndex++;
      // 1.2 加载后重新调用数据
      this.getPost();
    },
    //2.下拉刷新页面
    onRefresh() {
      // 2.1页码回到第一页
      this.cateList[this.active].pageIndex = 1;
      // 2.2清空数据重新加载数据
      this.cateList[this.active].postList.length = 0;

      // 2.3将之前可能重置为true的finished状态重置为false
      this.cateList[this.active].finished = false;

      // 重新获取数据
      this.getPost();
    },

    // 这是第二种方式的封装：
    async getPost() {
      let id = this.cateList[this.active].id;
      let current = await getNewslist({
        category: this.cateList[this.active].id, //当前栏目id
        pageSize: this.cateList[this.active].pageSize, //当前栏目每页显示的数
        pageIndex: this.cateList[this.active].pageIndex, //当前栏目页码
      });
      // 重新赋值取到data数据
      current = current.data.data;
      // 将current的数据赋值给每个数组里
      // this.cateList[this.active].postList = current;
      this.cateList[this.active].postList.push(...current);
      // 本次请求完成之后,将loading重置为false,方便下一次加载
      this.cateList[this.active].loading = false;
      //本次刷新完成之后,将isloading重置为false,隐藏刷新框
      this.cateList[this.active].isLoading = false;

      // 判断 数据是否全部加载完毕，如果要求数据六条,返回五条,说明数据返回成功
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
    },

    // 第二种方式封装结尾
    // //这是发送请求获取到新闻列表数据,id是根据索引值获取的
    // //   let res = await getNewslist(id);
    // //   this.newsList = res.data.data;
    // //   console.log("这是newList", this.newsList);
    // async getPost() {
    //   // 获取当前被激活栏目的新闻数据
    //   // 根据索引值到获取到的数据中cateList中匹配,然后拿到id
    //   let id = this.cateList[this.active].id;
    //   let res = await getNewslist(id);
    //   this.cateList[this.active].postList = res.data.data;
    // },
    // 这是另一种方式实现
    async getactive(name, title) {
      if (this.cateList[name].postList == 0) {
        // let id = this.cateList[name].id;
        // let res = await getNewslist(id);
        // this.cateList[name].postList = res.data.data;
        this.getPost();
      }
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