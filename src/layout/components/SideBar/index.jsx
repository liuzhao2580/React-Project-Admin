import React , {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { constRoutes } from '@/routes/routerConfig'
import './index.less'
const { Sider } = Layout
const SideBar = () => {
    let [collapsed] = useState(false)
    const getMenu = (routerArr = constRoutes) => {
        // eslint-disable-next-line array-callback-return
        return routerArr.map(item => {
            if(!item.hidden) {
                if(!item.children) {
                    return (
                        <Menu.Item key={item.path} icon={item.icon}>{item.title}</Menu.Item>
                    )
                }
                else if(item.children) return getMenu(item.children)
            }
        })
    }
    const history = useHistory()
    let MenuClick = ({key})=> {
        history.push(key)
    }
    return (
        <Sider className='sider-box' trigger={null} collapsible collapsed={collapsed} theme="light">
            <div className="logo" />
            <Menu theme="light" mode="inline" onClick={MenuClick}>
                {getMenu()}
            </Menu>
        </Sider>
    )
}
export default SideBar