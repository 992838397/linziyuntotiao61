<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @click="isFocus = !isFocus" />
      <span
        class="comment"
        @click="$router.push({ path: `/comment/${post.id}` })"
      >
        <i class="iconfont iconpinglun-"></i>
        <em>{{ post.like_length }}</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{ active: post.has_star }"
        @click="starThispost"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" v-model="content"></textarea>
      <div>
        <span @click="postComment">发 送</span>
        <span @click="cancelReplay">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { starPost, postCommentList } from "@/apis/post";
export default {
  data() {
    return {
      isFocus: false,
      content: "",
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    commentObj: {
      type: Object,
      default: null,
    },
  },
  methods: {
    // 点击收藏
    async starThispost() {
      let id = this.$route.params.id;
      let res = await starPost(id);
      this.post.has_star = !this.post.has_star;
      console.log(res);
    },

    // 点击发布评论
    async postComment() {
      if (this.content.length == 0) {
        this.$toast.fail("请输入内容");
        return;
      }

      // 1.准备参数
      let id = this.post.id;
      let data = {
        content: this.content,
      };
      // 判断一下是否有回复id参数,如果有,那么就是回复评论
      if (this.commentObj) {
        data.parent_id = this.commentObj.id;
      }
      // 2.发起评论请求
      let res = await postCommentList(id, data);
      console.log(res);

      //提升用户体验
      // 3.1提示信息
      this.$toast.success("发布成功");
      // 3.2清空输入框
      this.content = "";
      // 3.3关闭输入框
      this.isFocus = false;
      //3.4页面内容的刷新-子组件要告诉父组件进行列表数据的刷新
      this.$emit("refresh");
    },
    // 这是取消按钮
    cancelReplay() {
      this.isFocus = !this.isFocus;
      this.$emit("cancel");
    },
  },
  watch: {
    // 如果传递过来的值发生了变化,立马弹出输入框
    commentObj() {
      console.log("这是子组件的", this.commentObj);
      if (this.commentObj) {
        this.isFocus = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.active {
  color: #f00;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }

  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>