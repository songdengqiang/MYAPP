<template>
  <div class="zb_paper_sys">
    <header class="zb_headerCss">
      <h1>周博的可视化系统</h1>
      <div class="zb_deck">
        <div></div>
        <div></div>
        <div class="decoration">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="decoration">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="decoration1">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="decoration1">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="zb_topBar zb_topBar1">
        <div class="btns choose choose1" @click="changDate(1)">
          测试可视化管理
        </div>
        <div class="btns choose choose2" @click="changDate(2)">测试采集</div>
        <div class="btns choose choose3" @click="changDate(3)">测试分析</div>
      </div>
      <div class="zb_topBar zb_topBar2">
        <div class="btns choose choose4" @click="changDate(4)">
          测试数据追溯
        </div>
        <div class="btns choose choose5" @click="changDate(5)">
          测试流程分析
        </div>
        <div class="btns choose choose6" @click="changDate(0)">退出</div>
      </div>
    </header>
    <main class="zb_main_css">
      <div class="zb_main_left">
        <h1>pdf文档的处理</h1>
        <div class="zb_main_left_pdf">这是获取到的相应PDF预览</div>
        <div class="zb_main_left_img">这是获取到的相应img预览</div>
        <div class="zb_main_left_button">
          <button class="btn_pro_green">选择pdf</button>
          <button class="btn_pro_red">开始处理</button>
        </div>
      </div>
      <div class="zb_main_center">这是文字处理</div>
      <div class="zb_main_right">这是知识图生成</div>
    </main>
  </div>
</template>

<script>
export default {
  name: "kg_zb_paper1",
  methods: {
    changDate(num) {
      const _this = this;
      switch (num) {
        case 0:
          _this.$emit("GetKey", 1);
          _this.$router.push({ path: "/Project" });
      }
    },
  },
};
</script>

<style scoped>
@import url("../../../assets/css/project/zb_paper1.css");
@import url("../../../assets/css/common/decoration.css");
@import url("../../../assets/css/common/decoration1.css");
@import url('../../../assets/css/common/button.css');
</style>