import React from "react"
import { Button, Input, List } from "antd"
const TodoList = () => {
  const insertItem = () => {}
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Input
          placeholder='输入些什么'
          style={{ width: "200px", marginRight: "10px" }}
        />
        <Button type='primary' onClick={insertItem}>
          新增
        </Button>
      </div>
      <List
        header={<div>ToDo List</div>}
        bordered
        // dataSource={list}
        renderItem={item => (
          <List.Item className='todo-item'>{item.title}</List.Item>
        )}
      />
    </div>
  )
}
export default TodoList
