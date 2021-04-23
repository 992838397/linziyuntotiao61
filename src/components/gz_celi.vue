<template>
  <div class="gz_celi">
    <div class="left">{{ title }}</div>
    <div class="right">
      <span>{{ msg }}</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.gz_celi {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #999;
  padding: 0 10px;
  box-sizing: border-box;
  .right {
    font-size: 12px;
    color: #999;
  }
}
</style>