<template>
  <input
    type="text"
    class="gz_input"
    :[pn]="{ success: flag, error: !flag }"
    @input="handlerInput"
    @blur="handlerchange"
  />
</template>

<script>
export default {
  data() {
    return {
      flag: "",
      pn: "",
    };
  },
  props: {
    rules: {
      type: RegExp,
    },
    msg: {
      type: String,
    },
  },
  methods: {
    handlerInput(e) {
      let value = e.target.value;
      //   校验用户输入是否正确
      if (this.rules) {
        // 动态绑定一个值,如果一开始就写:class,页面加载就会爆红
        this.pn = "class";
        //判断是否传递了规则
        if (this.rules.test(value)) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }

      // 字传父
      this.$emit("input", value);
    },
    // 失焦处理事件
    handlerchange(e) {
      let value = e.target.value;
      if (this.rules) {
        // 判断释放传递了规则
        //进行用户规则校验
        if (!this.rules.test(value)) {
          // console.log(this.msg);
          this.$toast.fail(this.msg);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.gz_input {
  width: 318/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
  line-height: 60px;
}
.success {
  border-bottom-color: green;
  color: green;
}
.error {
  border-bottom-color: red;
  color: red;
}
</style>