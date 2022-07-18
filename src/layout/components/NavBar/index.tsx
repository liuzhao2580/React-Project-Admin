import React from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Breadcrumb from './components/Breadcrumb'
import Personal from './components/Personal'
import { useStore } from '@/store'

const { Header } = Layout
const NavBar = () => {
  const { appStore } = useStore()
  const sideStatus = appStore.sideStatus
  return (
    <Header style={{ padding: 0 }} className="header-box">
      {/* 侧边栏开关按钮 */}
      <div
        className="trigger"
        onClick={() => appStore.changeSideStatus(!sideStatus)}
        style={{ fontSize: '20px' }}
      >
        {sideStatus ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      {/* 面包屑 */}
      <Breadcrumb></Breadcrumb>
      {/* 头像下拉框 */}
      <Personal></Personal>
    </Header>
  )
}
export default NavBar
