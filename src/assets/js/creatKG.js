import * as d3 from 'd3'
export default class creatGraph {
  // 默认自变量
  constructor(container) {
    this.nodes = [{
        id: "机床1",
        color: "red",
        type: 'device',
        attr: {
          name: '11'
        }
      },
      {
        id: "机床2",
        color: "green",
        type: 'device',
        attr: {
          name: '11'
        }
      }
    ]
    this.links = [{
        source: '节点1',
        target: '节点2',
        value: 1,
        relation: '关系1',
        color: 'black'
      },
      {
        source: '节点1',
        target: '节点2',
        value: 1,
        relation: '关系2',
        color: 'black'
      },
      {
        source: '节点1',
        target: '节点2',
        value: 1,
        relation: '关系3',
        color: 'black'
      },
      {
        source: '节点1',
        target: '节点2',
        value: 1,
        relation: '关系4',
        color: 'black'
      }
    ]
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
      .attr('refX', 39) // 设置箭头离端点的距离
      .attr('refY', -2)
      .attr('orient', 'auto')
      .attr('stroke-width', 1)
      .attr('markerWidth', 6) // 设置箭头的大小
      .attr('markerHeight', 6) // 设置箭头的大小，长宽统一则不变形
      .attr('markerUnits', 'strokeWidth')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -4 11 9')
      .append('path')
      .attr('d', 'M -19 -10 L 20 0 L -45 20')
      .attr('fill', 'black')
      .attr('stroke-opacity', 0.9)
    // 设置图形的总容器

    // 首先绘制图形之间的连线
    const graphLink = g.append('g').attr('class', 'linKG')
      .attr('stroke-opacity', 0.5)
      .attr('fill', 'none')
      .attr('marker-end', 'url(#direction1)')
      .selectAll('path')
      .data(this.links)
      .join('path')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
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
      .attr('fill', function (d) {
        return d.color
      })
      .attr('class', function (d) {
        return d.id
      })
      .call(this.drag(simulations))

    // 设置节点的title信息
    graphNode.append('title').style('width', 19).text(d => `${d.id}-${d.type}`)

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
        return d.id
      })
      .call(this.drag(simulations))

    g.append('g').selectAll('text').data(this.links).join('text')
      .attr('dy', 0)
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

  // 设置初始数据
  addData(data) {
    this.nodes = data.nodes
    this.links = data.links
  }

  // 图形的更新--当数据变化后需要进行图形的重新绘制
  updataGraphs() {
    d3.select(this.container).select('svg').remove()
    this.drawGraph(this.svgName)
  }

  // 数据的处理
  dealData(links) {
    let count = 0
    if (links.length > 0) {
      for (const value of links) {
        for (let i = count; i < this.links.length; i++) {
          if (value.source === this.links[i].source && value.target === this.links[i].target) {
            count++
            break
          }
        }
        // console.log(count)
        switch (count) {
          case 0:
            this.links[this.links.indexOf(value)].doubles = 2
            break
          case 1:
            this.links[this.links.indexOf(value)].doubles = -2
            break
          case 2:
            this.links[this.links.indexOf(value)].doubles = 1
            break
          case 3:
            this.links[this.links.indexOf(value)].doubles = -1
            break
          case 4:
            this.links[this.links.indexOf(value)].doubles = 0.7
            break
          case 5:
            this.links[this.links.indexOf(value)].doubles = -0.7
            break
          case 6:
            this.links[this.links.indexOf(value)].doubles = 0.6
            break
          case 7:
            this.links[this.links.indexOf(value)].doubles = -0.6
            break
          case 8:
            this.links[this.links.indexOf(value)].doubles = 0.54
            break
          case 9:
            this.links[this.links.indexOf(value)].doubles = -0.54
            break
          case 10:
            this.links[this.links.indexOf(value)].doubles = 0.51
            break
          case 11:
            this.links[this.links.indexOf(value)].doubles = -0.51
            break
          case 12:
            this.links[this.links.indexOf(value)].doubles = 0.505
            break
          case 13:
            this.links[this.links.indexOf(value)].doubles = -0.505
            break
          case 14:
            this.links[this.links.indexOf(value)].doubles = 0.50
            break
          case 15:
            this.links[this.links.indexOf(value)].doubles = -0.50
            break
        }
      }
    }

  }

  //   // 力的仿真模型
  simulation(nodes, links) {
    const simu = d3.forceSimulation(nodes)
      .force('collision', d3.forceCollide(35))
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
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
    const r = d.doubles * Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
    if (d.doubles > 0) {
      return `
            M${d.target.x},${d.target.y}
            A${r},${r} 0 0,1 ${d.source.x},${d.source.y}
        `
    } else {
      return `
            M${d.source.x},${d.source.y}
            A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `
    }
  }
}
