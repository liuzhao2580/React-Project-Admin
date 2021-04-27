import React, { useEffect } from "react"
import { Layout } from "antd"
import SiderDom from "./components/SideBar"
import NavBarDom from "./components/NavBar"
import ContentDom from "./components/Content"
import resizeMethods from "../utils/onResize"
const LayoutDom = () => {
  useEffect(() => {
    resizeMethods.listenResize()
    return () => {
      window.removeEventListener("resize", resizeMethods.onResize)
    }
  }, [])
  return (
    <Layout className='layout-box'>
      {/* 侧边栏 */}
      <SiderDom />
      {/* 右边内容区域 */}
      <Layout className='site-layout'>
        {/* 头部 */}
        <NavBarDom />
        {/* 内容区域 */}
        <ContentDom></ContentDom>
      </Layout>
    </Layout>
  )
}
export default LayoutDom
