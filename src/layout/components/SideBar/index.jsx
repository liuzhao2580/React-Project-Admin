import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'

import { constRoutes } from '@/routes/routerConfig'
import './index.scss'
const { Sider } = Layout
const { SubMenu } = Menu
const SideBar = ({ sideStatus }) => {
  const history = useHistory()
  // 默认选择的侧边栏 当前选中的菜单项 key 数组
  let [selectedKeys, setSelectenMenu] = useState(['/dashboard'])

  // 初始展开的 SubMenu 菜单项 key 数组
  let [defaultOpenKeys] = useState(() => {
    const getOpenKeyArr = history.location.pathname.split('/')
    const getOpenKey = getOpenKeyArr.length >= 3 ? '/' + getOpenKeyArr[1] : null
    return getOpenKey
  })
  // 获取当前的路由
  useEffect(() => {
    const { pathname } = history.location
    setSelectenMenu([pathname])
  }, [history.location])
  // 获取动态的侧边栏
  const getMenu = (routerArr = constRoutes) => {
    // eslint-disable-next-line array-callback-return
    return routerArr.map(item => {
      if (!item.meta.hidden) {
        if (!item.children) {
          return (
            <Menu.Item key={item.path} icon={<item.meta.icon />}>
              {item.meta.title}
            </Menu.Item>
          )
        } else if (item.children) {
          return (
            <SubMenu
              key={item.redirect}
              icon={<item.meta.icon />}
              title={item.meta.title}
            >
              {getMenu(item.children)}
            </SubMenu>
          )
        }
      }
    })
  }
  // 点击侧边栏跳转
  let MenuClick = ({ key }) => {
    history.push(key)
  }
  return (
    <Sider
      className="sider-box"
      trigger={null}
      collapsible
      collapsed={sideStatus}
      theme="light"
    >
      <div className="logo" />
      <Menu
        theme="light"
        selectedKeys={selectedKeys}
        mode="inline"
        onClick={MenuClick}
        defaultOpenKeys={[defaultOpenKeys]}
      >
        {getMenu()}
      </Menu>
    </Sider>
  )
}

const mapStateToProps = state => {
  return {
    sideStatus: state.app.sideStatus
  }
}
export default connect(mapStateToProps)(withRouter(SideBar))
