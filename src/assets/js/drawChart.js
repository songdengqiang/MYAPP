import * as d3 from 'd3'
import echarts from 'echarts'

const drawChart = {
    // 绘制饼图
    drawPie1: (data) => {
      var datas = data
      var outerRadius = 50 //外半径
      var innerRadius = 0 //内半径
      var pie = d3.pie() //数据转化引擎
      var color = d3.scaleOrdinal().domain([0,5]).range(['red','green','yellow','pink','blue'])
      //主函数
      function draws () {
         var pieData = pie(datas)
         console.log(pieData)
         var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)
    

         var arcs = d3.select('.pieChart').append('svg').attr('width','300').attr('height','300')
         arcs.append('g').attr('stroke', 'white').attr('transform','translate(100,100)').selectAll('path').data(pieData).join('path')
         .attr('fill',function(d,i){
             return color(i)
         }).attr('d',arc).append('title').text(d => {d.value})
      }
      
      return draws
    },
  }
  
  export default drawChart