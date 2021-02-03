import echarts from 'echarts'

export default class draw_bar_chart {
  // 默认自变量
  constructor(container) {
    this.container = `${container}`
    this.myBar = null
    this.bartitle = '图表1'
    this.legend = {
        data: ['实例1'],
        orient: 'vertical',
        right: 0,
        bottom: 40,
        top: 0,
        left: 0
      },
      this.series = [{
        name: '图例1',
        type: 'bar',
        data: [10, 23, 21, 34, 23]
      }]
    this.xAxis = {
      data: ['实体1', '实体2', '实体3', '实体4', '实体5'],
      name: '实体类别',
      nameLocation: 'end',
      axisLabel: {
        // showMinLabel: true,
        showMaxLabel: true
      },
      nameTextStyle: {
        align: 'center',
        padding: [10, 0, 0, 30],
      }
    }
    this.yAxis = {
      name: '实体相似度',
      nameTextStyle: {
        align: 'center',
        padding: [0, 0, -5, 0], //上，右，下，左s
        width: 5,
        // height: '100',
        overflow: 'breakAll',
        ellipsis: 'truncate'
      }
    }
    this.grid = {
      top: '25%',
      left: '10%',
      right: '28%',
      bottom: '12%'
    }
  }
  // 绘制图形
  drawBar() {
    this.myBar = echarts.init(document.getElementById(this.container))

    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      title: {
        text: this.bartitle,
        textStyle: {
          fontSize: 15,
          fontFamily: '楷体'
        }
      },
      legend: this.legend,
      grid: this.grid,
      xAxis: this.xAxis,
      yAxis: this.yAxis,
      series: this.series
    }
    this.myBar.setOption(option)
  } //图表的初始化
  initTitle(title) {
    this.bartitle = title
    this.drawBar()
  }
  //添加默认数据
  //图例的设置
  setLegend(data = {
    orient: 'horizontal',
    right: 0,
    bottom: 0,
    top: 25,
    left: 80
  }) {
    this.legend = data
  }
  initlegend(data) {
    this.legend.data = data
  }
  legendO(data) {
    this.legend.orient = data
  }
  legendR(data) {
    this.legend.right = data
  }
  legendT(data) {
    this.legend.top = data
  }
  legendL(data) {
    this.legend.left = data
  }
  legendB(data) {
    this.legend.bottom = data
  }
  initxdata(data) {
    this.xAxis.data = data
  }
  initydata(data) {
    this.yAxis.data = data
  }
  initseries(data = {
    data: [],
    name: ''
  }) {
    data.type = 'bar'
    this.series = []
    this.series.push(data)
  }
  //添加数据
  addSeries(data = {
    data: [],
    name: ''
  }) {
    data.type = 'bar'
    this.series.push(data)
  }
  //设置grid的区域
  setGrid(data = {
    top: '25%',
    left: '12%',
    right: '12%',
    bottom: '8%'
  }) {
    this.grid = data
  }
}
