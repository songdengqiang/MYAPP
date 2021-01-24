<template>
  <div class="zb_kg_tabular">
      <div class="zb_tabular_left">
        <div class='tabular_title'>Tabular Detaction</div>
        <div class="tabular_input">
          <span>选择相应文件</span>
          <input type="file" class="btn_input_file" size="2">
          <p>{{inputFile}}</p>
        </div>
        <div class="dis_document">显示区</div>
      </div>
      <div class="zb_tabular_right">
        <div>处理</div>
        <div>结果</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'kg_zb_tabular',
    data () {
      return {
        inputFile: '尚未选择文件！'
      }
    }
}
</script>

<style scoped>
@import url('../../../assets/css/common/button.css');
@import url('../../../assets/css/project/zb_papar_tabular.css');
</style>