import React from "react"
import { connect } from "react-redux"
import "./index.scss"
import HomeCard from "./components/HomeCard"
import TodoList from "./components/TodoList"
import EchartsCom from "@/components/EchartsCom"
const HomeDom = () => {
  return (
    <div>
      {/* 头部分块 */}
      <HomeCard />
      {/* Echarts 组件 */}
      <EchartsCom></EchartsCom>
      {/* todolist 组件 */}
      <TodoList />
    </div>
  )
}

export default connect()(HomeDom)
