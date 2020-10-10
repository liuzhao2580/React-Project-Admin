import React from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'

import './styles/sider.less'
const { Sider } = Layout
export default class SiberDom extends React.Component {
    state = {
        collapsed: false
    }
    render() {
        return (
            <Sider className='sider-box' trigger={null} collapsible collapsed={this.state.collapsed} theme="light">
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
}
