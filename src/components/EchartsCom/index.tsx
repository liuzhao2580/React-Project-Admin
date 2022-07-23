import React, {
  useState,
  useEffect,
  useLayoutEffect,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle
} from 'react'
import { ECharts, EChartsOption, init } from 'echarts'

interface ICom {
  options: EChartsOption
  height?: string
}

const EchartsCom: ForwardRefRenderFunction<any, ICom> = (
  { options, height },
  ref
) => {
  /** 设置 echarts的id */
  const echartId: string =
    'echartId-' + new Date().getTime() + Math.floor(Math.random() * 10000)

  /** 获取 echarts的dom 元素 */
  const [echartDom, setEchartDom] = useState<HTMLElement | null>()
  /** 获取 echarts的实例化对象 */

  useImperativeHandle(ref, () => ({
    myChart
  }))
  const [myChart, setMyChart] = useState<ECharts | null>(null)

  useLayoutEffect(() => {
    setEchartDom(document.getElementById(`${echartId}`))
    if (echartDom) {
      if (myChart === null) {
        setMyChart(init(echartDom))
      } else {
        myChart?.clear()
        myChart?.resize()
        myChart?.setOption(options)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echartDom, myChart, options])

  /** 监听屏幕的变化 */
  const windowResizeEcharts = () => {
    myChart?.resize()
  }
  useEffect(() => {
    window.addEventListener('resize', windowResizeEcharts)
    return () => {
      window.removeEventListener('resize', windowResizeEcharts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myChart])

  return (
    <div
      id={echartId}
      className="echart-box"
      style={{ height: height || '300px' }}
    ></div>
  )
}

export default forwardRef(EchartsCom)
