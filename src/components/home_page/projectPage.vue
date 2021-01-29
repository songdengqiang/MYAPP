<template>
  <div class="projecct_main">
    <div class="task_block" @click="module_choose(0)">
      <h1>周师兄的论文系统</h1>
    </div>
    <div class="task_block" @click="module_choose(1)">
      <h1>刘师兄的论文系统</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "projectPage",
  methods: {
    module_choose(num) {
      const _this = this;
      switch (num) {
        case 0:
          _this.$router.push({ path: "/zb_system/mainPage"});
          break;
        case 1:
          _this.$router.push({ path: "/login/colorGrid"});
          break;
      }
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/home_pageC/projectPage.css");
</style>>
