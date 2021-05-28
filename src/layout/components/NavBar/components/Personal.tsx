import React from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

// 静态图片
import personalImg from '@/assets/images/funny.png'
/** 右上角的个人 */
const Personal = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  )
  return (
    <div className="personal-box">
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="personal-dropdown">
          <span className="personal-name">HI 123</span>
          <img className="personal-img" src={personalImg} alt="" />
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default Personal
