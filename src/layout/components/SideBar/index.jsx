import React , {useState} from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'

import './index.less'
const { Sider } = Layout
const SideBar = () => {
    let [collapsed] = useState(false)
    return (
        <Sider className='sider-box' trigger={null} collapsible collapsed={collapsed} theme="light">
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                </Menu.Item>
                <Menu.Item key="4" icon={<UploadOutlined />}>
                    nav 4
                </Menu.Item>
                <Menu.Item key="5" icon={<UploadOutlined />}>
                    nav 5
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
export default SideBar