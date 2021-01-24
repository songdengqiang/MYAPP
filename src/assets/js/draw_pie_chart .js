import echarts from 'echarts'

export default class draw_pie_chart {
  // 默认自变量
  constructor(container) {
    this.container = `${container}`
    this.myPie = null
    this.bartitle = '知识统计图'
    this.legend = ['图例1']
    this.series = [{
      name: '图例1',
      type: 'pie',
      radius: '55%',
      roseType: 'angle',
      data: [
        {value:235, name:'设备知识'},
        {value:215, name:'物料知识'},
        {value:125, name:'工艺知识'},
        {value:165, name:'人员知识'},
        {value:165, name:'环境知识'}
      ]
    }]
    this.grid = {
      top: '25%',
      left: '10%',
      right: '28%',
      bottom: '12%'
    }
  }
  // 绘制图形
  drawPie() {
    this.myPie = echarts.init(document.getElementById(this.container))
    let option = {
      title: {
        text: this.bartitle,
        textStyle: {
          fontSize: 15,
          fontFamily: '楷体'
        }
      },
      grid: this.grid,
      series: this.series
    }
    this.myPie.setOption(option)
  } //图表的初始化
  initTitle(title) {
    this.bartitle = title
    this.drawBar()
  }
  //添加默认数据
  initseries(data = {
    data: [],
    name: ''
  }) {
    data.type = 'pie'
    this.series = []
    this.series.push(data)
  }
}
