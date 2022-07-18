import React, { useEffect } from 'react'
import { Layout, Spin } from 'antd'
import './index.scss'
import SiderDom from './components/SideBar'
import NavBarDom from './components/NavBar'
import ContentDom from './components/Content'
import OnResize from '../utils/modules/onResize'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

const LayoutDom = () => {
  const { appStore } = useStore()
  const layoutLoading = appStore.layoutLoading
  const changeSideStatus = appStore.changeSideStatus
  const resizeMethods = new OnResize(changeSideStatus)
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

export default observer(LayoutDom)
