import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Breadcrumb } from 'antd'

import { constRoutes } from '@/routes/routerConfig'
const BreadcrumbDom = () => {
  const history = useHistory()
  const { pathname } = history.location
  const [breadcrumbArr, setBreadcrumbArr] = useState([])
  const [animateFlag, setAnimateFlag] = useState(false)
  // 获取当前的路由
  useEffect(() => {
    breadcrumbChange(pathname)
    setAnimateFlag(!animateFlag)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  // 每次路由切换的时候 面包屑变换
  const breadcrumbChange = pathname => {
    function findBreadcrumb(routePATH) {
      if (pathname.indexOf(routePATH) === -1) return false
      else return true
    }
    const getRouters = []
    // 获取当前的路由
    function routerLoop(routes = constRoutes) {
      routes.forEach(item => {
        if (item.path === pathname) {
          if (item.path === '/dashboard') return
        }
        if (!item.children) {
          // 说明该路由显示在面包屑上
          if (item.meta.breadcrumbShowFlag !== false) {
            if (findBreadcrumb(item.path)) getRouters.push(item)
          }
        } else {
          if (
            findBreadcrumb(item.path) &&
            item.meta.breadcrumbShowFlag !== false
          ) {
            getRouters.push(item)
          }
          routerLoop(item.children)
        }
      })
    }
    routerLoop()
    setBreadcrumbArr([...getRouters])
  }
  return (
    <CSSTransition
      in={animateFlag}
      classNames="breadrumb-animate"
      timeout={300}
    >
      <Breadcrumb className="breadcrumb-box">
        <Breadcrumb.Item href="#/dashboard">首页</Breadcrumb.Item>
        {breadcrumbArr.map((breadcrumb, index) => {
          return (
            <Breadcrumb.Item
              key={index}
              href={`/#${
                breadcrumb.redirect ? breadcrumb.redirect : breadcrumb.path
              }`}
            >
              {breadcrumb.meta.title}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </CSSTransition>
  )
}

export default withRouter(BreadcrumbDom)
