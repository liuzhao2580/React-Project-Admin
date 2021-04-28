import React, { useEffect } from "react"
import * as Echarts from "echarts"
import "./index.scss"
export default prop => {
  console.log(prop, "this.prop")
  useEffect(() => {
    init()
  })
  // 设置 echart 的 id
  const echartId =
    "echartId" + new Date().getTime() + Math.floor(Math.random() * 10000)
  /** 初始化 */
  const init = () => {
    const echartInit = Echarts.init(document.querySelector(`#${echartId}`))
    echartInit.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    })
  }
  return (
    <div
      id={echartId}
      className='echart-box'
      style={{ height: prop.height || "300px" }}
    ></div>
  )
}
