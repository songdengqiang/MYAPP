import * as d3 from 'd3'
import { zl_calculator_zl } from 'zl_calculator_zl'
const commonF = {
  // 获取实时时间
  get_today_time: () => {
    let strictIsoParse1 = d3.timeFormat('%Y-%m-%d/周%w/%H:%M:%S')
    let strictIsoParse2 = d3.timeFormat('%Y-%m-%d')
    return [strictIsoParse1(new Date()),strictIsoParse2(new Date())]
  },
  // 可做数字（包含小数和整数）间的加，减，乘，除，括号，取余，等运算
  calculators: (CalString) => {
    const res = zl_calculator_zl(CalString)
    return res
  },
  // 绘制力导向图
 
  // 随机产生介于min和max之间的数字
  getRndInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
}

export default commonF
