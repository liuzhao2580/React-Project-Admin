import React, { useRef } from 'react'
import { Row, Col } from 'antd'
import { ECharts } from 'echarts'
import './index.scss'
import HomeCard from './components/HomeCard'
import TodoList from './components/TodoList'
import EchartsCom from '@/components/EchartsCom'
import {
  LineOptions,
  AutoPlayBarEchartsUtils,
  BarOptions,
  BarOtherOptions,
  BarScrollOptions
} from '@/utils/modules/echarts-utils'
const HomeDom = () => {
  const autoPlayEchartRef = useRef<ECharts>()
  return (
    <div>
      {/* 头部分块 */}
      <HomeCard />
      {/* Echarts 组件 */}
      <div className="echart-component">
        <EchartsCom options={LineOptions()} />
        {/* 可以自动播放的柱形图 */}
        <EchartsCom
          ref={autoPlayEchartRef}
          options={AutoPlayBarEchartsUtils(autoPlayEchartRef.current as ECharts)}
        />
        <Row className="echart-component-main" gutter={10}>
          <Col xs={{ span: 24 }} xl={{ span: 8 }} className="echart-item-col">
            <div className="echart-item-div">
              <EchartsCom options={BarOptions()} />
            </div>
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 8 }} className="echart-item-col">
            <div className="echart-item-div">
              <EchartsCom options={BarOtherOptions()} />
            </div>
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 8 }} className="echart-item-col">
            <div className="echart-item-div">
              <EchartsCom options={BarScrollOptions()} height={8 * 60 + 'px'} />
            </div>
          </Col>
        </Row>
      </div>
      {/* todolist 组件 */}
      <TodoList />
    </div>
  )
}

export default HomeDom
