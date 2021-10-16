import React, { useEffect } from 'react'
import { Layout, Spin } from 'antd'
import { connect } from 'react-redux'
import './index.scss'
import SiderDom from './components/SideBar'
import NavBarDom from './components/NavBar'
import ContentDom from './components/Content'
import resizeMethods from '../utils/modules/onResize'
const LayoutDom = ({ userInfo }) => {
  useEffect(() => {
    resizeMethods.onResize()
    resizeMethods.listenResize()
    return () => {
      window.removeEventListener('resize', resizeMethods.onResize)
    }
  }, [])
  console.log(userInfo, 'userInfo')
  return (
    <Spin
      tip="加载中..."
      delay={300}
      style={{ maxHeight: 'initial' }}
      spinning={!userInfo.id}
    >
      <Layout className="layout-box">
        {/* 侧边栏 */}
        <SiderDom />
        {/* 右边内容区域 */}
        <Layout className="site-layout">
          {/* 头部 */}
          <NavBarDom />
          {/* 内容区域 */}
          <ContentDom></ContentDom>
        </Layout>
      </Layout>
    </Spin>
  )
}

const mapUserInfoStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapUserInfoStateToProps)(LayoutDom)
