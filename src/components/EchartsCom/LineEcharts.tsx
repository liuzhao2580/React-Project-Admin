import React, { useState, useEffect, useMemo, useCallback } from 'react'
import * as Echarts from 'echarts'
import './index.scss'
// import EchartsCom from "./index"

interface ILineParams {
  option: Object
}
const LineEcharts: React.FC<ILineParams> = prop => {
  console.log(prop)
  // 获取 id
  let echartId =
    'echartId' + new Date().getTime() + Math.floor(Math.random() * 10000)
  // 获取 dom
  let [echartDom, setEchartDom] = useState<HTMLElement | null>()
  /** 初始化 echarts */
  const initEcharts = () => {
    setEchartDom(document.getElementById(`${echartId}`))
    console.log(111)
    if (!echartDom) return
    Echarts.init(echartDom).setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: [
          'Mon21555555534345Mon21555555534345Mon21555555534345',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat',
          'Sun'
        ],
        axisLabel: {
          width: 60,
          overflow: 'breakAll'
        }
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          barWidth: 30,
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        }
      ]
    })
  }
  const getU = useCallback(initEcharts, [echartDom])
  useEffect(() => {
    getU()
  })
  console.log(echartDom)
  return (
    <div id={echartId} className="echart-box" style={{ height: '300px' }}></div>
  )
}

export default LineEcharts
