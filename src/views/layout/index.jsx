import React from 'react'
import { Layout } from 'antd'

import SiderDom from './components/sider'
import HeaderDom from './components/header'
import ContentDom from './components/content'
export default class LayoutDom extends React.Component {
    render() {
        return (
            <Layout>
                {/* 侧边栏 */}
                <SiderDom />
                {/* 右边内容区域 */}
                <Layout className="site-layout">
                    {/* 头部 */}
                    <HeaderDom />
                    {/* 内容区域 */}
                    <ContentDom />
                </Layout>
            </Layout>
        )
    }
}
