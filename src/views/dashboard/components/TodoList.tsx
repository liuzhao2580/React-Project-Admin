import React, { useRef} from 'react'
import { Button, Input, List } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'

const TodoList = () => {
  const inputValueRef = useRef<Input>(null)
  const { todoListStore } = useStore()
  const todoList = todoListStore.list
  /** 新增按钮 */
  const insertTodo = () => {
    if (inputValueRef.current) {
      todoListStore.insertTodoList({
        key: new Date().getTime(),
        title: inputValueRef.current.state.value
      })
    }
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
export default observer(TodoList)
