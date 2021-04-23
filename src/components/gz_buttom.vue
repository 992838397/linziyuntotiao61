<template>
  <div
    class="btn"
    :class="{
      primary: type == 'primary',
      danger: type == 'danger',
      orange: type == 'orange',
    }"
    @click="handlerClick"
  >
    <!-- 添加插槽,让用户自定义按钮文本内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
  methods: {
    handlerClick(e) {
      // console.log("handlerClick");
      // 子组件无法进行具体的业务处理，他只能告诉父组件需要单击事件
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 318 * 100vw /360;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #ccc;
  background-color: #ccc;
  line-height: 50px;
  text-align: center;
  margin: 0 auto;
  font-size: 20px;
  color: #666;
  margin: 0 auto;
  cursor: pointer;
}
.primary {
  border: 1px solid rgb(67, 145, 4);
  background-color: rgb(67, 145, 4);
  color: #fff;
}
.danger {
  border: 1px solid rgb(211, 29, 13);
  background-color: rgb(211, 29, 13);
  color: #fff;
}
.orange {
  border: 1px solid orange;
  background-color: orange;
  color: #fff;
}
</style>