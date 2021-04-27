<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="followUserByid" :class="{ active: post.has_follow }">{{
        post.has_follow ? "已关注" : "关注"
      }}</span>
    </div>
    <div class="detail">
      <div class="title">{{ post.title }}</div>
      <div class="desc">
        <span>aaaaa</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="post.content" v-if="post.type == 1"></div>
      <video :src="post.content" controls v-else></video>

      <div class="opt">
        <span class="like" :class="{ active: post.has_like }">
          <van-icon name="good-job-o" @click="postGoodByid" />点赞
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="@/assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>

    <!--footer -->
    <commentFooter :post="post"></commentFooter>
  </div>
</template>
<script>
import { geteditList, getGood } from "@/apis/post";
import { followUser, upfollowUser } from "@/apis/user";
import commentFooter from "@/components/gz_commentFooter";
export default {
  components: {
    commentFooter,
  },
  data() {
    return {
      post: {
        user: {},
      },
    };
  },
  async mounted() {
    let id = this.$route.params.id;
    let res = await geteditList(id);
    this.post = res.data.data;
    // console.log("这是", this.post.has_follow);
    console.log(this.post);
  },
  methods: {
    async followUserByid() {
      let id = this.post.user.id;
      let res;
      // 判断一下发送那个请求 如果关注了,发送取消关注请求
      if (this.post.has_follow) {
        res = await upfollowUser(id);
      } else {
        res = await followUser(id);
      }
      console.log(res);
      this.post.has_follow = !this.post.has_follow;
    },
    async postGoodByid() {
      let id = this.$route.params.id;
      let res = await getGood(id);
      if (res.data.message == "点赞成功") {
        // 点赞是有数据的,因此要+1或者-1
        ++this.post.like_length;
      } else {
        --this.post.like_length;
      }
      // 取反
      this.post.has_like = !this.post.has_like;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      background-color: transparent;
      border: 1px solid #aaa;
      color: #000;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  video {
    width: 100%;
  }
  .content {
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/ img {
      width: 100%;
    }
    /deep/ p {
      text-indent: 2em;
    }
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .active {
    color: red;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>