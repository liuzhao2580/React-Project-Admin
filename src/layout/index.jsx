import React from 'react'
import { Layout } from 'antd'
import {withRouter} from 'react-router-dom'

import SiderDom from './components/sider'
import HeaderDom from './components/header'
import ContentDom from './components/content'
class LayoutDom extends React.Component {
    render() {
        return (
            <Layout className='layout-box'>
                {/* 侧边栏 */}
                <SiderDom/>
                {/* 右边内容区域 */}
                <Layout className="site-layout">
                    {/* 头部 */}
                    <HeaderDom />
                    {/* 内容区域 */}
                    <ContentDom>{this.props.children}</ContentDom>
                </Layout>
            </Layout>
        )
    }
}
export default withRouter(LayoutDom)