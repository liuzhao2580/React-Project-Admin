import React from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, UserOutlined, ExportOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

// 静态图片
import personalImg from '@/assets/images/funny.png'
/** 右上角的个人 */
const Personal = () => {
  const history = useHistory()
  // 点击 菜单项
  const menuClick = e => {
    console.log(e)
    const { key } = e
    switch (key) {
      // 个人中心
      case 'personal':
        history.push('/personal')
        break
      // 退出登录
      case 'logout':
        console.log(history)
        history.replace('/login')
        break

      default:
        break
    }
  }
  const menu = (
    <Menu onClick={menuClick}>
      <Menu.Item key="personal">
        <UserOutlined />
        <span>个人中心</span>
      </Menu.Item>
      {/* <Menu.Item key="1">
        <span>修改密码</span>
      </Menu.Item> */}
      <Menu.Divider />
      <Menu.Item key="logout">
        <ExportOutlined />
        <span>退出登录</span>
      </Menu.Item>
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
