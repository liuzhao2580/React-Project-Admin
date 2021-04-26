import React from "react"
import { connect } from "react-redux"
import HomeCard from "./components/HomeCard"
import TodoList from "./components/TodoList"
import "./index.scss"
const HomeDom = () => {
  return (
    <div>
      {/* 头部分块 */}
      <HomeCard />
      {/* todolist 组件 */}
      <TodoList />
    </div>
  )
}

export default connect()(HomeDom)
