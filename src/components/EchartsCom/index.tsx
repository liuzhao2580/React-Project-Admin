import React, { useState, useEffect, useCallback } from 'react'
import * as Echarts from 'echarts'

const EchartsCom = prop => {
  /** 设置 echarts的id */
  let echartId =
    'echartId-' + new Date().getTime() + Math.floor(Math.random() * 10000)
  /** 获取 echarts的dom 元素 */
  let [echartDom, setEchartDom] = useState<HTMLElement | null>()
  /** 获取 echarts的实例化对象 */
  let myChart: any = null

  /** 初始化 echarts */
  const initEcharts = () => {
    setEchartDom(document.getElementById(`${echartId}`))
    if (!echartDom) return
    if (myChart) myChart.clear()
    myChart = Echarts.init(echartDom)
    myChart.setOption(prop.option)
  }

  /** 监听屏幕的变化 */
  const windowResizeEcharts = () => {
    if (myChart) myChart.resize()
  }
  const getU = useCallback(initEcharts, [echartDom])
  useEffect(() => {
    getU()
    window.addEventListener('resize', windowResizeEcharts)
    return () => {
      window.removeEventListener('resize', windowResizeEcharts)
    }
  })

  return (
    <div
      id={echartId}
      className="echart-box"
      style={{ height: prop.height || '300px' }}
    ></div>
  )
}

export default EchartsCom
