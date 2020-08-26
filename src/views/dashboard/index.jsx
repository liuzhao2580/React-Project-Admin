import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, List } from 'antd'
import ReactHooks from './components/reactHook'
import './index.scss'
const HomeDom = (props) => {
    let { inputValue, insertItem, list } = props
    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <Input placeholder='输入些什么' value={inputValue} style={{ width: '200px', marginRight: '10px' }} />
                <Button type='primary' onClick={insertItem}>
                    新增
                </Button>
            </div>
            <List
                header={<div>ToDo List</div>}
                bordered
                dataSource={list}
                renderItem={(item) => <List.Item className='todo-item'>{item.title}</List.Item>}
            />
            <ReactHooks />
        </div>
    )
}

// 映射关系
const todoListStateToProps = (state) => {
    return {
        inputValue: state.todoList.inputValue,
        list: state.todoList.list
    }
}

const todoListDispatchToProps = (dispatch) => {
    return {
        insertItem() {
            const action = {
                type: 'ACT_insertItem'
            }
            dispatch(action)
        }
    }
}

export default connect(todoListStateToProps, todoListDispatchToProps)(HomeDom)
