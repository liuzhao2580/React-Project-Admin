import React from "react"
import { Layout } from "antd"
import "./index.scss"
import Routes from "@/routes"
const { Content } = Layout
const ContentDom = () => {
  return (
    <Content className='content-box'>
      <Routes />
    </Content>
  )
}
export default ContentDom
