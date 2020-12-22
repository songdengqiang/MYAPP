<template>
  <div class="HomePage">
    <header class="headerCss">
      <h3>个人软件系统平台</h3>
      <div class="deck">
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
    </header>
    <div class="mainContainer">
      <div class="leftBar">
        <div v-show="barHide" class="leftContain">
          <h3>功能菜单的选择</h3>
          <div @click="funDisplay(1)">
            <div style="color:DarkOrange"><strong>常用小功能</strong></div>
            <div v-show="funHide1" @click="HomePagePush(2)" class="nameFun">计算器</div>
            <div v-show="funHide1" @click="HomePagePush(3)" class="nameFun">颜色表</div>
            <div v-show="funHide1" @click="HomePagePush(4)" class="nameFun">个人计划</div>
            <div v-show="funHide1" @click="HomePagePush(5)" class="nameFun">备忘录</div>
          </div>
          <div @click="funDisplay(2)">
            <div style="color:DarkOrange"><strong>绘图功能</strong></div>
            <div v-show="funHide2" @click="HomePagePush(11)" class="nameFun">绘制条形图</div>
            <div v-show="funHide2" @click="HomePagePush(12)" class="nameFun">绘制折线图</div>
            <div v-show="funHide2" @click="HomePagePush(13)" class="nameFun">绘制饼图</div>
          </div>
          <div @click="funDisplay(3)">
            <div style="color:DarkOrange"><strong>毕业论文</strong></div>
            <div v-show="funHide3" @click="HomePagePush(21)" class="nameFun">知识图谱原型系统</div>
          </div>
        </div>
        <div>
          <div>
            <img src="../assets/icon/Home.svg" alt="主页面" @click="HomePagePush(1)">
          </div>
          <div></div>
          <img src="../assets/icon/leftArrow.svg" alt="隐藏按钮" v-show="barHide" @click="disPlay(1)">
          <img src="../assets/icon/rightArrow.svg" alt="展开按钮" v-show="!(barHide)" @click="disPlay(2)">
        </div>
      </div>
      <div class="mainView">
        <router-view></router-view>
      </div>
    </div>
    <footer class="footerCss">
      <h4>KG小组（宋邓强）</h4>
      <h4>东华大学机械工程智能制造研究所</h4>
      <h4 >日期：{{times}}</h4>
    </footer>
  </div>
</template>

<script>
import * as d3 from 'd3'
import commF from '../assets/js/common'
export default {
  name: 'HomePage',
  data () {
    return {
      times: '223-332-223',
      msg: 'Welcome to Your Vue.js App',
      barHide: false,
      funHide1: false,
      funHide2: false,
      funHide3: false,
      funNum1: 0,
      funNum2: 0,
      funNum3: 0
      // barDisplay: true
    }
  },
  methods: {
    disPlay (num) {
      const _this = this
      switch (num) {
        case 1:
          d3.select('.leftBar').transition().duration(200).style('width', '2rem')
          d3.select('.mainView').transition().duration(200).style('width', '98%')
          _this.barHide = false
          break
        case 2:
          d3.select('.leftBar').transition().duration(200).style('width', '12%')
          d3.select('.mainView').transition().duration(200).style('width', '88%')
          setTimeout(() => {
            _this.barHide = true
          }, 200)
          break
      }
    },
    funDisplay (num) {
      const _this = this
      switch (num) {
        case 1:
          if (_this.funNum1 === 0) {
            _this.funHide1 = true
            _this.funNum1 = 1
            break
          } else {
            _this.funHide1 = false
            _this.funNum1 = 0
            break
          }
        case 2:
          if (_this.funNum2 === 0) {
            _this.funHide2 = true
            _this.funNum2 = 1
            break
          } else {
            _this.funHide2 = false
            _this.funNum2 = 0
            break
          }
        case 3:
          if (_this.funNum3 === 0) {
            _this.funHide3 = true
            _this.funNum3 = 1
            break
          } else {
            _this.funHide3 = false
            _this.funNum3 = 0
            break
          }
      }
    },
    HomePagePush (num) {
      const _this = this
      switch (num) {
        case 1:
          _this.$router.push({path: '/HomePage/firstPage'})
          break
        case 2:
          _this.funNum1 = 0
          _this.$router.push({path: '/HomePage/calculator'})
          break
        case 3:
          _this.funNum1 = 0
          _this.$router.push({path: '/HomePage/colorGrid'})
          break
        case 4:
          _this.funNum1 = 0
          _this.$router.push({path: '/HomePage/schedule'})
          break
        case 5:
          _this.funNum1 = 0
          _this.$router.push({path: '/HomePage/memo'})
          break
        case 11:
          _this.funNum2 = 0
          _this.$router.push({path: '/HomePage/barChart'})
          break
        case 12:
          _this.funNum2 = 0
          _this.$router.push({path: '/HomePage/lineChart'})
          break
        case 13:
          _this.funNum2 = 0
          _this.$router.push({path: '/HomePage/pieChart'})
          break
        case 21:
          _this.funNum3 = 0
          _this.$router.push({path: '/HomePage/protoSys'})
          break
      }
      
    },
  },
  mounted () {
    const _this= this
    _this.times = commF.getTime()
    setInterval(function () {
      _this.times = commF.getTime()
    }, 1000)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/common/header');
@import url('../assets/css/common/leftContainer');
@import url('../assets/css/common/footer');
.HomePage{
  background-color: #2b5d83;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center
}
</style>
