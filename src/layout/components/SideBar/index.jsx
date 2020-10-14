import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { constRoutes } from '@/routes/routerConfig'
import './index.less'
const { Sider } = Layout
const { SubMenu } = Menu
const SideBar = () => {
    // 展开关闭侧边栏
    let [collapsed] = useState(false)
    // 默认选择的侧边栏 当前选中的菜单项 key 数组
    let [selectedKeys, setSelectenMenu] = useState(['/dashboard'])

    const history = useHistory()
    useEffect(() => {
        const { pathname } = history.location
        setSelectenMenu(pathname)
    }, [history.location])
    // 获取动态的侧边栏
    const getMenu = (routerArr = constRoutes, path) => {
        // eslint-disable-next-line array-callback-return
        return routerArr.map(item => {
            if (!item.hidden) {
                if (!item.children) {
                    return (
                        <Menu.Item key={path ? `${path + item.path}` : item.path} icon={item.icon}>
                            {item.title}
                        </Menu.Item>
                    )
                } else if (item.children) {
                    return (
                        <SubMenu key={item.path} icon={item.icon} title={item.title}>
                            {getMenu(item.children, path ? `${path + item.path}` : item.path)}
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
        <Sider className='sider-box' trigger={null} collapsible collapsed={collapsed} theme='light'>
            <div className='logo' />
            <Menu theme='light' selectedKeys={selectedKeys} mode='inline' onClick={MenuClick}>
                {getMenu()}
            </Menu>
        </Sider>
    )
}
export default withRouter(SideBar)
