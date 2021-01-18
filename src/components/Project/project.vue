<template>
  <div class="projecct_main">
    <div class="project_panel" v-show="project_show">
      <div class="task_block" @click="module_choose(0)">
        <h1>周彬师兄的论文系统1</h1>
      </div>
      <div class="task_block">
        <h1>刘世民师兄的论文系统1</h1>
      </div>
      <div class="task_block" @click="module_choose(3)">
        <h1>返回主页面</h1>
      </div>
    </div>
    <!-- 子文件 -->
    <div class="project_content" v-show="!project_show">
      <router-view v-on:GetKey="Geton"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "project",
  data () {
    return {
      project_show: true
    }
  },
  methods: {
    Geton (param) {
      const _this = this
      _this.project_show = true
    },
    module_choose(num) {
      const _this = this;
      switch (num) {
        case 0:
          _this.project_show = false
          _this.$router.push({ path: "/Project/zbPaper" });
          break;
        case 1:
          _this.$router.push({ path: "/login/colorGrid" });
          break;
        case 2:
          _this.$router.push({ path: "/login/schedule" });
          break;
        case 3:
          _this.$router.push({ path: "/login" });
      }
    },
  },
  watch: {

  },
  mounted () {
    const _this = this
  }
};
</script>

<style scoped>
@import url("../../assets/css/project.css");
</style>