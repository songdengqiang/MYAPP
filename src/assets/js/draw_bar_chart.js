import echarts from 'echarts'

export default class draw_bar_chart {
  // 默认自变量
  constructor (container) {
    this.container = `${container}`
    this.myBar = null
    this.bartitle = '图表1'
    this.legend = ['图例1']
    this.series = [
      {name: '图例1',type: 'bar',data:[10,23,21,34,23]}
    ]
    this.xAxis = {
      data: ['实体1','实体2','实体3','实体4','实体5'],
      name: '实体类别',
      nameLocation: 'end',
      axisLabel: {
        // showMinLabel: true,
        showMaxLabel: true
      },
      nameTextStyle: {
        align: 'center',
        padding: [10,0,0,30],
      }
    }
    this.yAxis = {
      name: '实体数量',
      nameTextStyle: {
        align: 'center',
        padding: [0,0,-5,0],  //上，右，下，左s
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
  drawBar () {
    this.myBar = echarts.init(document.getElementById(this.container))

    let option = {
      title: {
        text: this.bartitle,
        textStyle: {
          fontSize: 15,
          fontFamily: '楷体'
        }
      },
      legend: {
        data:this.legend,
        orient: 'vertical',
        right: 0,
        bottom:40
        // top: 10
      },
      grid: this.grid,
      xAxis: this.xAxis,
      yAxis: this.yAxis,
      series: this.series
    }
    this.myBar.setOption(option)
  }//图表的初始化
  initTitle (title) {
    this.bartitle = title
    this.drawBar()
  }
  //默认添加数据
  initlegend (legend) {
    this.legend = legend
  }
  initxdata (data) {
    this.xAxis.data = data
  }
  initydata (data) {
    this.yAxis.data = data
  }
  // initseries (data = [{name:'',data:[]}]) {
  //   // data.type = 'bar'
  //   this.series = data
  // }
  initseries (data ={data:[],name:''}){
    data.type = 'bar'
    this.series = []
    this.series.push(data)
  }
}
  
