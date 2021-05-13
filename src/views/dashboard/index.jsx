import React from "react"
import { connect } from "react-redux"
import "./index.scss"
import HomeCard from "./components/HomeCard"
import TodoList from "./components/TodoList"
import LineEcharts from "@/components/EchartsCom/LineEcharts"
import PieEcharts from "@/components/EchartsCom/PieEcharts"
const HomeDom = () => {
  return (
    <div>
      {/* 头部分块 */}
      <HomeCard />
      {/* Echarts 组件 */}
      <div className='echart-component'>
        <LineEcharts option={12} />
        {/* <PieEcharts /> */}
      </div>
      {/* todolist 组件 */}
      <TodoList />
    </div>
  )
}

export default connect()(HomeDom)
