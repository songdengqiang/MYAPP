<template>
  <div class="zb_kg_ner">
    <div class="zb_kg_nerC">
      <div class="btn_pro_green btn1">选择文件</div>
      <div class="btn_pro_green btn1">标注</div>
      <div class="btn_pro_green btn1">训练</div>
      <div class="btn_pro_green btn1">测试</div>
    </div>
    <div class="zb_kg_nerM">
      <div class="left_mainPanel">标注数据集读取显示区域</div>
      <div class="center_mainPanel">
        <div class="center_mainPanel1">训练显示区</div>
        <div class="center_mainPanel2">训练精度柱状图</div>
      </div>
      <div class="right_mainPanel">
        <div class="top_right_mainPanel">
          <h2>输入测试内容</h2>
          <input type="text" class="right_mainPanel_input">
        </div>
        <div class="bottom_right_mainPanel">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'kg_zb_ner'
}
</script>

<style scoped>
@import url('../../../assets/css/common/button.css');
@import url('../../../assets/css/zb_system/zb_paper_ner.css');

</style>