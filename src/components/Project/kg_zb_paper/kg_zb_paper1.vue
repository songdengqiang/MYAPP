<template>
  <div class="zb_paper_sys">
    <!-- 头部的盒子 -->
    <header class="zb_headerCss">
      <h1 id="zb_header_title">IKG管理系统平台</h1>
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
        <div
          class="btns choose choose2"
          @click="changDate(5)"
          title="系统首页"
        >
          首页
        </div>
        <div
          class="btns choose choose1"
          @click="changDate(1)"
          title="文档内容提取模块"
        >
          Tabular
        </div>
        <div
          class="btns choose choose2"
          @click="changDate(2)"
          title="文档标注模块"
        >
          NER
        </div>
      </div>
      <div class="zb_topBar zb_topBar2">
        <div
          class="btns choose choose4"
          @click="changDate(3)"
          title="工业知识图谱模块"
        >
          IKG
        </div>
        <div
          class="btns choose choose5"
          @click="changDate(4)"
          title="知识图谱问答模块"
        >
          QA
        </div>
        <div class="btns choose choose6" @click="changDate(0)" title="退出系统">
          退出
        </div>
      </div>
    </header>
    <!-- 身体的盒子 -->
    <main class="zb_main_css">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "kg_zb_paper1",
  data () {
    return {
      myBar1: null,
      myBar2: null,
      myKG1: null
    }
  },
  methods: {
    changDate(num) {
      const _this = this;
      switch (num) {
        case 0:
          _this.$emit("GetKey", 1);
          _this.$router.push({ path: "/Project" });
          break
        case 1:
          _this.$router.push({path:"/Project/zbPaper/kg_tabular"})
          break
        case 2:
          _this.$router.push({path:'/Project/zbPaper/kg_NER'})
          break
        case 3:
          _this.$router.push({path:'/Project/zbPaper/kg_ikg'})
          break
        case 4:
          _this.$router.push({path:'/Project/zbPaper/kg_qa'})
          break
        case 5:
          _this.$router.push({path:'/Project/zbPaper/mainPage'})
          break
      }
    },
  }
};
</script>

<style scoped>
@import url("../../../assets/css/project/zb_paper1.css");
@import url("../../../assets/css/common/decoration.css");
@import url("../../../assets/css/common/decoration1.css");

#zb_header_title {
  font-family: "Times New Roman", "楷体";
  font-weight: bolder;
}
</style>