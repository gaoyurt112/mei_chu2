//引入echarts
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

//封装一个柱状图函数，接收参数dom元素，标题，x数据,y数据
function chartsInit (chartsref, xData, yData, type) {
  //初始化图表传入dom元素
  const myCharts = echarts.init(chartsref)
  //配置图标信息
  myCharts.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 25,
      left: 30,
      right: 30,
      bottom: 25,
      width: 'auto',
      height: 'auto'
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        color: "#fff",
        fontWeight: "bold"
      }
    },
    yAxis: {
      axisLabel: {
        color: "#fff",
        fontWeight: "bold"
      }
    },
    series: {
      name: '人次',
      type: type,
      data: yData,
      smooth: true,
      lineStyle: {
        color: '#fff',
        shadowColor: '#00ffff',
        shadowBlur: 15,
      },
      itemStyle: {
        color: '#fff',
        shadowColor: '#00ffff',
        shadowBlur: 15,
      }
    },
  })
}

//创建bar组件 接收父组件传递的数据
function BarCharts ({ style, xData, yData, type }) {
  //获取dom对象
  const chartsref = useRef(null)
  useEffect(() => {
    //调用图表函数
    chartsInit(chartsref.current, xData, yData, type)
  })

  return (
    <div ref={chartsref} style={style}></div>
  )
}

export default BarCharts
