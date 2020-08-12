import React from 'react'
import { Button, Input, List } from 'antd'
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
]
export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Input placeholder="Basic usage" />
                    <Button type="primary">新增</Button>
                </div>
                <List header={<div>ToDo List</div>} bordered dataSource={data} renderItem={(item) => <List.Item>{item}</List.Item>} />
            </div>
        )
    }
}
