<template>
    <main class="calculator">
        <div class="calculatorView">
          <div>
            <div class="record"><textarea name="record" id="textarea" cols="1" rows="6" v-model="cal_string"></textarea></div>
            <div class="resultC">{{calculatorResult}}</div>
          </div>
          <div>
            <span>算子键入：</span>
            <input type="text" placeholder="请输入你要计算的算子" v-model="cal_string">
            <button class="btn btn-primary" @click="calculator1()">计算</button>
          </div>
          <div>
            <button class="btn btn-primary" @click="KeyboardDis()">键盘键入</button>
          </div>
          <div v-show="keyboard" >
            <div class="keyboard">
              <div @click="stringSplicing('1')">1</div>
              <div @click="stringSplicing('2')">2</div>
              <div @click="stringSplicing('3')">3</div>
              <div @click="stringSplicing('4')">4</div>
              <div @click="stringSplicing('5')">5</div>
              <div @click="stringSplicing('6')">6</div>
              <div @click="stringSplicing('7')">7</div>
              <div @click="stringSplicing('8')">8</div>
              <div @click="stringSplicing('9')">9</div>
              <div @click="stringSplicing('0')">0</div>
              <div @click="stringSplicing('.')">.</div>
              <div @click="Remove()">Re</div>
            </div>
            <div class="keyboard1">
              <div @click="stringSplicing('+')">+</div>
              <div @click="stringSplicing('-')">-</div>
              <div @click="stringSplicing('*')">*</div>
              <div @click="stringSplicing('/')">/</div>
              <div @click="stringSplicing('%')">%</div>
              <div @click="stringSplicing('**')">**</div>
              <div @click="stringSplicing('(')">(</div>
              <div @click="stringSplicing(')')">)</div>
              <div class="equal" @click="calculator1()">=</div>
            </div>
          </div>
        </div>
        <div class="calculatorControl">
          <div>
            <div class="ControlC">科学计算器</div>
            <div class="ControlC">进制运算</div>
            <div class="ControlC">特殊运算</div>
            <div class="ControlC">待补充</div>
          </div>
          <div class="keyboard2">
            <div @click="stringSplicing('sin(')">sin</div>
            <div @click="stringSplicing('cos(')">cos</div>
            <div @click="stringSplicing('tan(')">tan</div>
            <div @click="stringSplicing('4')">4</div>
          </div>
        </div>
    </main>
</template>>

<script>
// import api from '@/assets/Js/home/home'
// import axios from 'axios'
// import * as d3 from 'd3'
import commonF from '../assets/js/common'
export default {
  name: 'calculator',
  data () {
    return {
      num: 0,
      calculatorResult: '0',
      keyboard: false,
      textData: '',
      cal_string: ''
    }
  },
  methods: {
    KeyboardDis () {
      const _this = this
      if (_this.num === 0) {
        _this.keyboard = true
        _this.num = 1
      } else {
        _this.keyboard = false
        _this.num = 0
      }
    },
    calculator1 () {
      const _this = this
      _this.calculatorResult = commonF.calculators(_this.cal_string)
    },
    stringSplicing (num) {
      const _this = this
      if (num === '**') {
        _this.cal_string = _this.cal_string + '*' + _this.cal_string
      } else {
        _this.cal_string = _this.cal_string + num
      }
    },
    Remove () {
      const _this = this
      _this.cal_string = ''
    }
  },
  mounted () {

  }
}
</script>

<style scoped >
/* 主体内容的设置 */
@import url("../assets/Css/calculator.css");
</style>
