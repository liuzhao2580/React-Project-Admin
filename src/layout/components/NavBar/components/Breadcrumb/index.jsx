import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { constRoutes } from '@/routes/routerConfig'
import './index.less'
const BreadcrumbDom = () => {
    const history = useHistory()
    const { pathname } = history.location
    const [breadcrumbArr, setBreadcrumbArr] = useState([])
    // 获取当前的路由
    useEffect(() => {
        breadcrumbChange(pathname)
    }, [pathname])
    // 每次路由切换的时候 面包屑变换
    const breadcrumbChange = pathname => {
        const getRouters = []
        // 获取当前的路由
        function routerLoop(routes = constRoutes) {
            return routes.find(item => {
                if (item.path === pathname) {
                    if (item.path !== '/dashboard') {
                        getRouters.push({
                            title: item.meta.title,
                            path: item.path
                        })
                        return true
                    } else return false
                } else if (item.children) {
                    const getFind = routerLoop(item.children)
                    if (getFind) {
                        getRouters.splice(getRouters.length - 1, 0, {
                            title: item.meta.title,
                            path: item.redirect
                        })
                    }
                    return getFind
                } else return false
            })
        }
        routerLoop()
        console.log(getRouters, 'getRouters')
        setBreadcrumbArr([...getRouters])
    }
    return (
        <Breadcrumb className='breadcrumb-box'>
            <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
            {breadcrumbArr.map(breadcrumb => {
                return <Breadcrumb.Item key={breadcrumb.path} href={`/#${breadcrumb.path}`}>{breadcrumb.title}</Breadcrumb.Item>
            })}
        </Breadcrumb>
    )
}

export default withRouter(BreadcrumbDom)