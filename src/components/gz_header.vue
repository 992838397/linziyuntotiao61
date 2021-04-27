<template>
  <div class="header">
    <div class="left">
      <slot name="left">aa</slot>
    </div>
    <div class="content">{{ title }}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "my_header",
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #999;
  padding: 0 10px;
  .right {
    font-size: 20px;
    color: red;
  }
}
</style>