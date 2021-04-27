<template>
  <div class="mystar">
    <gz_header title="我的收藏">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </gz_header>

    <gz_post v-for="item in post" :key="item.id" :post="item"></gz_post>
  </div>
</template>

<script>
import gz_header from "@/components/gz_header";
import gz_post from "@/components/gz_post";
import { getUserStars } from "@/apis/user.js";
export default {
  data() {
    return {
      post: {},
    };
  },
  components: {
    gz_header,
    gz_post,
  },
  async mounted() {
    let res = await getUserStars();
    this.post = res.data.data;
    console.log(res);
  },
};
</script>

<style>
</style>