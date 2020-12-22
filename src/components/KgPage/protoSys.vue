<template>
  <div class="protoSys">
    <div class="kgLeftBar">
      <div><strong>各类知识的统计</strong></div>
      <!-- 长期记忆 -->
      <div>
        <div class="pieChart">图形区域</div>
        <div class="kgChoose">
          <p>长期记忆</p>
          <p>车间</p>
          <p>工位</p>
        </div>
      </div>
      <!-- 融合记忆 -->
      <div>这是融合记忆的统计</div>
      <!-- 短期记忆 -->
      <div>这是短期记忆</div>
      <!-- 感官记忆 -->
      <div>这是感官记忆</div>
    </div>
    <div class="kgCenterBar">知识网络显示</div>
    <div class="kgRightBar">右侧知识控制</div>
  </div>
</template>

<script>
import drawChart from '@/assets/js/drawChart'
export default {
    name: 'protoSys',
    mounted () {
      let pie1 = drawChart.drawPie1([1,2,3,4])
      pie1()
    }
}
</script>

<style scoped>
@import url('../../assets/css/KgCss/protoSys.css');
</style>