import { useState, useMemo, FC } from 'react'
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'

import CustomIconCom from '@/components/CustomIcon'
import { constRoutes } from '@/routes/routerConfig'
const { Sider } = Layout
const { SubMenu } = Menu

interface ISideBar extends RouteComponentProps {
  sideStatus?: boolean
}

const SideBar: FC<ISideBar> = ({ sideStatus }) => {
  const history = useHistory()
  // 默认选择的侧边栏 当前选中的菜单项 key 数组
  let [selectedKeys, setSelectenMenu] = useState(['/dashboard'])

  // 初始展开的 SubMenu 菜单项 key 数组
  let [defaultOpenKeys, setDefaultOpenKeys] = useState<Array<any>>([])

  useMemo(() => {
    const { pathname } = history.location
    setSelectenMenu([pathname])

    const getOpenKeyArr = history.location.pathname.split('/')
    const getOpenKey = getOpenKeyArr.length >= 3 ? '/' + getOpenKeyArr[1] : null
    setDefaultOpenKeys([getOpenKey])
  }, [history.location])

  // 获取动态的侧边栏
  const getMenu = (routerArr = constRoutes) => {
    let getMenuList: any = []
    for (let index = 0; index < routerArr.length; index++) {
      const element = routerArr[index]
      if (element.meta) {
        if (!element.meta.hidden) {
          if (!element.children) {
            getMenuList.push(
              <Menu.Item key={element.path} icon={handleIcon(element)}>
                {element.meta.title}
              </Menu.Item>
            )
          } else if (element.children) {
            getMenuList.push(
              <SubMenu
                key={element.path}
                icon={handleIcon(element)}
                title={element.meta.title}
              >
                {getMenu(element.children)}
              </SubMenu>
            )
          }
        }
      }
    }
    return getMenuList
  }
  /** 处理侧边栏图标 */
  const handleIcon = item => {
    if (typeof item.meta.icon === 'string') {
      return <CustomIconCom iconPath={item.meta.icon} />
    } else {
      return <item.meta.icon />
    }
    // return <iconCom />
  }
  getMenu()
  // 点击侧边栏跳转
  let MenuClick = ({ key }) => {
    history.push({pathname: key})
  }
  return (
    <Sider
      className="sider-box"
      trigger={null}
      collapsible
      collapsed={sideStatus}
      theme="light"
    >
      <div className="logo" />
      <Menu
        theme="light"
        selectedKeys={selectedKeys}
        mode="inline"
        onClick={MenuClick}
        defaultOpenKeys={defaultOpenKeys}
      >
        {getMenu()}
      </Menu>
    </Sider>
  )
}

const mapStateToProps = state => {
  return {
    sideStatus: state.app.sideStatus
  }
}
export default connect(mapStateToProps)(withRouter(SideBar))
