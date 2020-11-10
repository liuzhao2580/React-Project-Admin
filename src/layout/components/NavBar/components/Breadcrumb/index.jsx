import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { constRoutes } from '@/routes/routerConfig'
import './index.less'
const BreadcrumbDom = () => {
    const history = useHistory()
    const { pathname } = history.location
    const [breadcrumbArr, setBreadcrumbArr] = useState([
        {
            title: '首页',
            path: '/dashboard'
        }
    ])
    // 获取当前的路由
    useEffect(() => {
        breadcrumbChange(pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])
    // 每次路由切换的时候 面包屑变换
    const breadcrumbChange = pathname => {
        const getRouters = []
        // 获取当前的路由
        function routerLoop(routes = constRoutes){
            routes.find(item => {
                if(item.path === pathname) {
                    return true
                }
                else if(item.children) {
                    
                }
            })
        }
        const getArr = constRoutes.find(item => {
            if(item.path === pathname) return true
            else if(item.children) {
               return item.children.find(item1 => item1.path === pathname)
            }else return false
        })
        console.log(getArr, 'getArr')
    }
    return (
        <Breadcrumb className='breadcrumb-box'>
            {breadcrumbArr.map(breadcrumb => {
                return <Breadcrumb.Item key={breadcrumb.path}>{breadcrumb.title}</Breadcrumb.Item>
            })}
        </Breadcrumb>
    )
}

export default withRouter(BreadcrumbDom)
