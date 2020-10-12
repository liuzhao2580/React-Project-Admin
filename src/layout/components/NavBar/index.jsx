import React, { useState } from 'react'
import './index.less'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
const { Header } = Layout
const NavBar = () => {
    const [collapsed] = useState(false)
    return (
        <Header style={{ padding: 0 }} theme='light' className='header-box'>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger'
            })}
        </Header>
    )
}
export default NavBar
