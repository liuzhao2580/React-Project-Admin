import React from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import Breadcrumb from './components/Breadcrumb'
import Personal from './components/Personal'

const { Header } = Layout
const NavBar = ({ sideStatus, ChangeAsideStatus }) => {
  return (
    <Header style={{ padding: 0 }} theme="light" className="header-box">
      {/* 侧边栏开关按钮 */}
      <div
        className="trigger"
        onClick={() => ChangeAsideStatus(!sideStatus)}
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
const mapStateAsideStatus = state => {
  return {
    sideStatus: state.app.sideStatus
  }
}
const mapDispatchChangeAsideStatus = dispatch => {
  return {
    ChangeAsideStatus(flag) {
      dispatch('app/CHANGE_sideStatus', flag)
    }
  }
}
export default connect(
  mapStateAsideStatus,
  mapDispatchChangeAsideStatus
)(NavBar)
