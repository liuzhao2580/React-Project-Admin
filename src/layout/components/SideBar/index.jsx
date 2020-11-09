import React, { useState,useEffect} from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import { constRoutes } from '@/routes/routerConfig'
import store from '@/store'
import './index.less'
const { Sider } = Layout
const { SubMenu } = Menu
const SideBar = () => {
    const history = useHistory()
    // 展开关闭侧边栏
    let [collapsed] = useState(store.getState().app.sideStatus)
    // 默认选择的侧边栏 当前选中的菜单项 key 数组
    let [selectedKeys, setSelectenMenu] = useState(['/dashboard'])

    // 初始展开的 SubMenu 菜单项 key 数组
    let [defaultOpenKeys] = useState(()=> {
        const getOpenKeyArr = history.location.pathname.split('/')
        const getOpenKey = getOpenKeyArr.length >=3 ? '/' + getOpenKeyArr[1] : null
        return getOpenKey
    })
    // 获取当前的路由
    useEffect(() => {
        const { pathname } = history.location
        setSelectenMenu(pathname)
    }, [history.location])
    // 获取动态的侧边栏
    const getMenu = (routerArr = constRoutes) => {
        // eslint-disable-next-line array-callback-return
        return routerArr.map(item => {
            if (!item.hidden) {
                if (!item.children) {
                    return (
                        <Menu.Item key={item.path} icon={item.icon}>
                            {item.title}
                        </Menu.Item>
                    )
                } else if (item.children) {
                    return (
                        <SubMenu key={item.path} icon={item.icon} title={item.title}>
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
        <Sider className='sider-box' trigger={null} collapsible collapsed={collapsed} theme='light'>
            <div className='logo' />
            <Menu
                theme='light'
                selectedKeys={selectedKeys}
                mode='inline'
                onClick={MenuClick}
                defaultOpenKeys={[defaultOpenKeys]}
            >
                {getMenu()}
            </Menu>
        </Sider>
    )
}
export default withRouter(SideBar)
