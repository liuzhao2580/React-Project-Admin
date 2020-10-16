import React from 'react'
import { Layout } from 'antd'
import './index.less'
import {LayoutRoutes} from '@/routes'
import { Switch } from 'react-router-dom'
const { Content } = Layout
const ContentDom = () => {
    return (
        <Content className="content-box">
            <Switch>
                {LayoutRoutes()}
            </Switch>
        </Content>
    )
}
export default ContentDom
