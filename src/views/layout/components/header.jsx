import React from 'react'
import headerStyle from './styles/header.module.scss'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
const { Header } = Layout
export default class HeaderDom extends React.Component {
    constructor() {
        super()
        console.log(headerStyle)
    }
    state = {
        collapsed: false
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        return (
            <Header style={{ padding: 0 }} theme='light' className={ headerStyle['header-box']}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle
                })}
                <div>Hello World</div>
            </Header>
        )
    }
}
