import React, { useRef } from 'react'
import { Button, Input, List } from 'antd'
import { connect } from 'react-redux'
const TodoList = ({ todoList, InsertTodoList }) => {
  const inputValueRef = useRef<any>(null)
  /** 新增按钮 */
  const insertTodo = () => {
    // if (inputValueRef.current) {
    //   InsertTodoList(inputValueRef.current.state.value)
    //   inputValueRef.current.state.value = ''
    // }
  }
  return (
    <div>
      <div>
        <Input
          placeholder="输入些什么"
          ref={inputValueRef}
          style={{ width: '200px', marginRight: '10px' }}
        />
        <Button type="primary" onClick={insertTodo}>
          新增
        </Button>
      </div>
      <List
        header={<div>ToDo List</div>}
        bordered
        dataSource={todoList}
        renderItem={(item: any) => (
          <List.Item className="todo-item">{item.title}</List.Item>
        )}
      />
    </div>
  )
}
// todolist的数组
const mapStateToProps = state => {
  return {
    todoList: state.todoList.list
  }
}
// 增加 todolist 元素
const mapDispatchToProps = dispatch => {
  return {
    InsertTodoList(data) {
      dispatch('todoList/InsertList', data)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
