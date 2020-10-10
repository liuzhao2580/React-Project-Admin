import React from 'react'
import { Layout } from 'antd'
import './styles/content.less'
const { Content } = Layout
export default class ContentDom extends React.Component {
    render() {
        return <Content className="content-box">{this.props.children}</Content>
    }
}
