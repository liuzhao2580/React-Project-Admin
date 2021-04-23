import React from "react"
import { connect } from "react-redux"
import TodoList from "./components/todoList"
import "./index.scss"
const HomeDom = () => {
  return (
    <div>
      <TodoList />
    </div>
  )
}

export default connect()(HomeDom)
