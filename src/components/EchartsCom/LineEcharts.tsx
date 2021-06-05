import React, { useState, useEffect, useCallback } from 'react'
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
    if (!echartDom) return
    Echarts.init(echartDom).setOption({
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          smooth: true,
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          smooth: true,
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          smooth: true,
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ]
    })
  }
  const getCallback = useCallback(initEcharts, [echartDom])
  useEffect(() => {
    getCallback()
  }, [prop, getCallback])
  return (
    <div id={echartId} className="echart-box" style={{ height: '300px' }}></div>
  )
}

export default LineEcharts
