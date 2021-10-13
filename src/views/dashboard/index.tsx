import React from 'react'
import { connect } from 'react-redux'
import './index.scss'
import HomeCard from './components/HomeCard'
import TodoList from './components/TodoList'
import Echarts from '@/components/EchartsCom'
import { LineOptions } from '@/utils/modules/echarts-utils'
const HomeDom = () => {
  const lineEchartsOptions = LineOptions()

  
  return (
    <div>
      {/* 头部分块 */}
      <HomeCard />
      {/* Echarts 组件 */}
      <div className="echart-component">
        <Echarts option={lineEchartsOptions} />
      </div>
      {/* todolist 组件 */}
      <TodoList />
    </div>
  )
}

export default connect()(HomeDom)
