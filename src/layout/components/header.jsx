import React from 'react'
import './styles/header.scss'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
const { Header } = Layout
export default class HeaderDom extends React.Component {
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
            <Header style={{ padding: 0 }} theme='light' className='header-box'>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle
                })}
            </Header>
        )
    }
}
