import React from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'
const { Sider } = Layout
export default class SiberDom extends React.Component {
    state = {
        collapsed: false
    }
    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} className='sider-box'>
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
                </Menu>
            </Sider>
        )
    }
}
