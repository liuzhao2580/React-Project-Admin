import React from 'react'
import { Layout } from 'antd'
import {withRouter} from 'react-router-dom'

import SiderDom from './components/SideBar'
import NavBarDom from './components/NavBar'
import ContentDom from './components/Content'
const LayoutDom = () => {
    return (
        <Layout className='layout-box'>
            {/* 侧边栏 */}
            <SiderDom/>
            {/* 右边内容区域 */}
            <Layout className="site-layout">
                {/* 头部 */}
                <NavBarDom />
                {/* 内容区域 */}
                <ContentDom></ContentDom>
            </Layout>
        </Layout>
    )
}
export default withRouter(LayoutDom)