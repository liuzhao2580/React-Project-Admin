import React, { useEffect } from 'react'
import { Layout, Spin } from 'antd'
import { connect } from 'react-redux'
import './index.scss'
import SiderDom from './components/SideBar'
import NavBarDom from './components/NavBar'
import ContentDom from './components/Content'
import resizeMethods from '../utils/modules/onResize'
import IStoreState from '@/typescript/store'
interface IProps {
  layoutLoading: boolean
}

const LayoutDom = ({ layoutLoading }: IProps) => {
  useEffect(() => {
    resizeMethods.onResize()
    resizeMethods.listenResize()
    return () => {
      window.removeEventListener('resize', resizeMethods.onResize)
    }
  }, [])
  return (
    <Spin
      tip="加载中..."
      delay={300}
      style={{ maxHeight: 'initial' }}
      spinning={layoutLoading}
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

const mapUserInfoStateToProps = (state: IStoreState) => {
  return {
    layoutLoading: state.app.layoutLoading
  }
}

export default connect(mapUserInfoStateToProps)(LayoutDom)
