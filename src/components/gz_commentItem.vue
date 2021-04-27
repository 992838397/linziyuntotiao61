<template>
  <div class="commentItem">
    <!-- 递归,自己调用自己, 递归要有出口 -->
    <commentItem
      v-if="parent.parent"
      :parent="parent.parent"
      @replay="hanlderReplay"
    ></commentItem>
    <div class="top">
      <div class="left">
        <span>{{ parent.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span @click="hanlderReplay(parent)">回复</span>
    </div>
    <div class="bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
export default {
  // 添加name可以使组件自己调用自己, 也就是递归
  name: "commentItem",
  props: {
    parent: {
      type: Object,
    },
  },
  methods: {
    hanlderReplay(v) {
      console.log("这是子组件发出的", v);
      this.$emit("replay", v);
    },
  },
};
</script>
<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>