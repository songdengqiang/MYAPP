import * as d3 from 'd3'
export default class creatGraph {
  // 默认自变量
  constructor(container) {
    this.nodes = [{
      id: 0,
      color: "red",
      labels: ['person'],
      name: '机床1'
    }]
    this.links = []
    this.container = `.${container}`
    this.svgWidth = 400
    this.svgHeight = 400
    this.svgName = container
  }

  // 绘制图的主函数
  drawGraph() {
    // this.svgName = svgNum
    this.setContainer(this.container) // 设置容器的大小
    this.dealData(this.links)
    const simulations = this.simulation(this.nodes, this.links)
    const svg = d3.select(this.container).append('svg').attr('viewBox', [0, 0, this.svgWidth, this.svgHeight])
    const dragSvg = this.transforms(svg, this.svgName)
    const g = svg.append('g').attr('class', 'svg' + this.svgName)
    // 连线箭头的设置
    dragSvg.append('marker')
      .attr('id', 'direction1')
      .attr('refX', 33) // 设置箭头离端点的距离
      .attr('refY', 6)
      .attr('orient', 'auto')
      .attr('stroke-width', 2)
      .attr('markerWidth', 8) // 设置箭头的大小
      .attr('markerHeight', 8) // 设置箭头的大小，长宽统一则不变形
      .attr('markerUnits', 'strokeWidth')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 0 12 12')
      .append('path')
      .attr('d', 'M2,2 L2,11 L10,6 L2,2')
      .attr('fill', 'black')
      .attr('stroke-opacity', 0.9)
    dragSvg.append('marker')
      .attr('id', 'direction2')
      .attr('refX', 25) // 设置箭头离端点的距离
      .attr('refY', 7)
      .attr('orient', 'auto')
      .attr('stroke-width', 2)
      .attr('markerWidth', 10) // 设置箭头的大小
      .attr('markerHeight', 10) // 设置箭头的大小，长宽统一则不变形
      .attr('markerUnits', 'strokeWidth')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 0 12 12')
      .append('path')
      .attr('d', 'M-5,4 L2,12 L10,8 L-5,4')
      .attr('fill', 'black')
      .attr('stroke-opacity', 0.9)
    // 设置图形的总容器

    // 首先绘制图形之间的连线
    const graphLink = g.append('g').attr('class', 'linKG')
      .attr('stroke-opacity', 0.5)
      .attr('fill', 'none')
      .selectAll('path')
      .data(this.links)
      .join('path')
      .attr('stroke', 'black')
      .attr('marker-end', function(d){
        if(d.doubles === 0){
          return 'url(#direction1)'
        }else {
          return 'url(#direction2)'
        }
      })
      .attr('stroke-width', 0.8)
      .attr('class', d => `link_${d.relation}`) // 线的类型
      .attr('id', d => d.source.id + '_' + d.target.id + '_' + d.relation) // 线的唯一标识
      .call(this.drag(simulations))

    // 然后绘制图形中的所有点
    const graphNode = g.append('g').attr('class', `nodeG_${this.container}`)
      .selectAll('circle')
      .data(this.nodes)
      .join('circle')
      .attr('r', 15)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .on('mouseover', function (d, i) {
        d3.select(this)
          .attr('r', 20)
          .attr('stroke', 'grey')
          .attr('stroke-width', 8)
      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .attr('r', 15)
          .attr('stroke', 'black')
          .attr('stroke-width', 2)
      })
      .attr('fill', function (d) {
        if (d.color) {
          return d.color
        } else {
          return 'greenyellow'
        }

      })
      .attr('class', function (d) {
        return d.id
      })
      .call(this.drag(simulations))

    // 设置节点的title信息
    graphNode.append('title').style('width', 19).text(d => `${d.name}`)

    const nodeName = g.append('g').attr('class', `nodeName_${this.container}`)
      .selectAll('text')
      .data(this.nodes)
      .join('text')
      .attr('x', 10)
      .attr('y', 5)
      .attr('dx', 0)
      .attr('dy', 4)
      .style('font-weight', 'bold')
      .style('font-size', 9)
      .style('fill', 'black')
      .style('opacity', '0.8')
      .attr('text-anchor', 'middle')
      .attr('class', 'node_name')
      .text(function (d) {
        return d.name
      })
      .call(this.drag(simulations))

    g.append('g').selectAll('text').data(this.links).join('text')
      .attr('dy', -1)
      .style('fill', 'black')
      .style('opacity', '1')
      .attr('class', 'linkText')
      .attr('text-anchor', 'middle')
      .attr('font-size', 7)
      .append('textPath')
      .attr('xlink:href', d => '#' + d.source.id + '_' + d.target.id + '_' + d.relation)
      .attr('startOffset', '50%')
      .text(function (d) {
        return d.relation
      })

      simulations.on('tick', () => {
      graphNode
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
      graphLink
        .attr('d', this.linkArc)
      nodeName
        .attr('x', d => d.x)
        .attr('y', d => d.y)
    })
  }
  // 图形的更新--当数据变化后需要进行图形的重新绘制
  updataGraphs(data) {
    this.nodes = []
    this.links = []
    for(let i of data.links){
      this.links.push(i)
    }
    for(let j of data.nodes){
      this.nodes.push(j)
    }
    d3.select(this.container).select('svg').remove()
    this.drawGraph(this.svgName)
  }

  // 数据的处理
  dealData(links) {
    let num = 0
    if (links.length > 0) {
      for (const value of links) {
        let count = 0
        for (let i = num; i < this.links.length; i++) {
          if (value.source === this.links[i].source && value.target === this.links[i].target) {
            count++
          }
        }
        switch (count) {
          case 1:
            this.links[links.indexOf(value)].doubles = 0
            break
          // case 1:
          //   this.links[this.links.indexOf(value)].doubles = -2
          //   break
          case 2:
            this.links[this.links.indexOf(value)].doubles = 1
            break
          // case 3:
          //   this.links[this.links.indexOf(value)].doubles = -1
          //   break
          case 3:
            this.links[this.links.indexOf(value)].doubles = 0.67
            break
          // case 5:
          //   this.links[this.links.indexOf(value)].doubles = -0.7
          //   break
          case 4:
            this.links[this.links.indexOf(value)].doubles = 0.6
            break
          // case 7:
          //   this.links[this.links.indexOf(value)].doubles = -0.6
          //   break
          case 5:
            this.links[this.links.indexOf(value)].doubles = 0.54
            break
          // case 9:
          //   this.links[this.links.indexOf(value)].doubles = -0.54
          //   break
          case 6:
            this.links[this.links.indexOf(value)].doubles = 0.51
            break
          // case 11:
          //   this.links[this.links.indexOf(value)].doubles = -0.51
          //   break
          case 7:
            this.links[this.links.indexOf(value)].doubles = 0.505
            break
          // case 13:
          //   this.links[this.links.indexOf(value)].doubles = -0.505
          //   break
          case 8:
            this.links[this.links.indexOf(value)].doubles = 0.50
            break
          // case 15:
          //   this.links[this.links.indexOf(value)].doubles = -0.50
          //   break
        }
        num++
      }
    }

  }

  //   // 力的仿真模型
  simulation(nodes, links) {
    const simu = d3.forceSimulation(nodes)
      .force('collision', d3.forceCollide(35))
      .force('link', d3.forceLink(links).id(d => d.id).distance(110))
      .force('charge', d3.forceManyBody().strength(-30))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .force('center', d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2))
    return simu
  }

  // svg的缩放和移动
  transforms(svgContainer, svgNum) {
    svgContainer.call(d3.zoom().on('zoom', function () {
      d3.select('.' + 'svg' + svgNum).attr('transform', d3.event.transform)
    }))
    return svgContainer
  }

  // 设置svg容器的大小
  setContainer(container) {
    this.svgWidth = d3.select(container).node().getBoundingClientRect().width
    this.svgHeight = d3.select(container).node().getBoundingClientRect().height
  }

  // 力的仿真触发，拖动时触发
  drag(simulation) {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  }

  // 绘制曲线的连线
  linkArc(d) {
    // console.log(d.doubles)
    if(d.doubles === 0){
      return `
            M${d.target.x},${d.target.y}
            L${d.source.x},${d.source.y}
        `
    }else{
      const r = d.doubles * Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
        return `
              M${d.target.x},${d.target.y}
              A${r},${r} 0 0,1 ${d.source.x},${d.source.y}
          `
    }
  }
}
