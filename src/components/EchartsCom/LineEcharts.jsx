import React, { useState, useEffect } from "react"
import * as Echarts from "echarts"
import "./index.scss"
import EchartsCom from "./index"
const LineEcharts = prop => {
  console.log(prop, "this.prop")
  // 设置 echart 的 id
  const [echartId] = useState(
    "echartId" + new Date().getTime() + Math.floor(Math.random() * 10000),
  )
  let [echartDom, setEchartDom] = useState(null)
  useEffect(() => {
    setEchartDom(document.querySelector(`#${echartId}`))
    console.log(echartDom, "")
  }, [echartId, echartDom])
  return (
    <>
      {/* <EchartsCom init={init} echartId={echartId} echartDom={echartDom} /> */}
    </>
  )
}
LineEcharts.propTypes = {}

export default LineEcharts
