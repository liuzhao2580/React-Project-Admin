/** 配置 echarts */
import { ECharts, EChartsOption, graphic } from 'echarts'

const yData = ['Angular', 'React', 'Vue', 'JavaScript']

let echartsInterval: any = null

/** 清除 echarts 的定时器 */
export const clearEchartsInterval = () => {
  clearInterval(echartsInterval)
}

/** 自动播放的 echart 图表 */
export const AutoPlayBarEchartsUtils = (myEchart: ECharts): EChartsOption => {
  const xAxisData: string[] = []
  const barSeriesData: number[] = []
  const lineSeriseData: number[] = []
  const whileLength = 10
  ;(function () {
    let len = 0
    let now = new Date()
    while (len < whileLength) {
      xAxisData.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
      barSeriesData.push(Math.floor(Math.random() * 1000) + len)
      lineSeriseData.push(Math.floor(Math.random() * 1000) + len)
      now = new Date(+now - 2000)
      len++
    }
  })()
  if (myEchart) {
    echartsInterval = setInterval(() => {
      const now = new Date()
      xAxisData.shift()
      xAxisData.push(now.toLocaleTimeString().replace(/^\D*/, ''))
      barSeriesData.shift()
      lineSeriseData.shift()
      barSeriesData.push(Math.floor(Math.random() * 1000))
      lineSeriseData.push(Math.floor(Math.random() * 1000))
      myEchart.setOption({
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: xAxisData
          }
        ],
        series: [
          {
            data: barSeriesData
          },
          {
            data: lineSeriseData
          }
        ]
      })
      myEchart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 0
      })
    }, 2100)
  }
  return {
    title: {
      text: '自动播放的 echart 图表'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Bar',
        type: 'bar',
        data: barSeriesData
      },
      {
        name: 'Line',
        type: 'line',
        data: lineSeriseData
      }
    ]
  }
}

/** X轴滚动条-折线图的配置 */
export const LineOptions = (): EChartsOption => {
  let base = +new Date(2000, 1, 2)
  const oneDay = 24 * 3600 * 1000
  const data = [[base, Math.random() * 300]]
  for (let i = 1; i < 10000; i++) {
    const now = new Date((base += oneDay))
    data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])])
  }
  return {
    title: {
      text: 'X轴滚动条-折线图的配置'
    },
    grid: {
      left: '5%',
      right: '5%'
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 20
      },
      {
        start: 0,
        end: 20
      }
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        symbol: 'none',
        data
      }
    ]
  }
}

/** 堆叠的柱形图 */
export const BarOptions = (): EChartsOption => {
  const fontColor = '#000'
  const seriesData = [50, 60, 70, 80]
  return {
    title: {
      text: '堆叠的柱形图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: params => {
        const { axisValueLabel, value } = params[0]
        return `<span style="display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0, 255, 253, 1)"></span> <span>${axisValueLabel}</span> <span>${value}</span>`
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '12%'
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: [
      {
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: fontColor,
          verticalAlign: 'bottom',
          lineHeight: 50,
          align: 'left',
          padding: [0, 0, 0, 10],
          formatter: (value, index) => {
            return `{a|TOP${seriesData.length - index}}  ${value}`
          },
          rich: {
            a: {
              padding: 5,
              borderRadius: 4,
              color: '#000',
              backgroundColor: '#00F1FF'
            }
          }
        },
        data: yData
      },
      {
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: fontColor,
          verticalAlign: 'bottom',
          lineHeight: 50,
          align: 'right',
          formatter: (value, index) => {
            return seriesData[index] + '%'
          }
        },
        data: yData
      }
    ],
    series: [
      {
        type: 'bar',
        zlevel: 10,
        barWidth: 8,
        itemStyle: {
          borderRadius: 10,
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(1, 140, 255, 0)' },
            { offset: 0.5, color: '#00708f' },
            { offset: 1, color: 'rgba(0, 255, 253, 1)' }
          ])
        },
        data: seriesData
      },
      {
        type: 'bar',
        barGap: '-100%',
        barWidth: 8,
        itemStyle: {
          color: '#000911',
          borderRadius: 10
        },
        data: [100, 100, 100, 100]
      }
    ]
  }
}

/** 堆叠的柱形图 */
export const BarOtherOptions = (): EChartsOption => {
  const fontColor = '#000'
  const seriesData = [30, 50, 60, 80]
  return {
    title: {
      text: '(年份)',
      textStyle: {
        color: fontColor,
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: params => {
        const { axisValueLabel, value } = params[0]
        return `<span style="display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(0, 255, 253, 1)"></span> <span>${axisValueLabel}</span> <span>${value}</span>`
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: {
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: fontColor
      },
      data: [2016, 2017, 2018, 2019]
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        zlevel: 10,
        barWidth: 8,
        itemStyle: {
          borderRadius: 10,
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(1, 85, 255, 0)' },
            { offset: 0.5, color: '#005ea0' },
            { offset: 1, color: 'rgba(0, 193, 255, 1)' }
          ])
        },
        data: seriesData
      },
      {
        name: '2012',
        type: 'bar',
        barGap: '-100%',
        barWidth: 8,
        itemStyle: {
          color: '#000911',
          borderRadius: 10
        },
        label: {
          show: true,
          position: 'right',
          formatter: params => {
            const { dataIndex } = params
            return `${seriesData[dataIndex]}`
          }
        },
        data: [100, 100, 100, 100]
      }
    ]
  }
}

/** 带有滚动条的柱形图 */
export const BarScrollOptions = (): EChartsOption => {
  const fontColor = '#000'
  const seriesData = [30, 50, 60, 80, 22, 44, 22, 11]
  const bgSeriesData = Array(8).fill(100)
  return {
    title: {
      text: '(年份)',
      textStyle: {
        color: fontColor,
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: params => {
        const { axisValueLabel, value } = params[0]
        return `<span style="display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(0, 255, 253, 1)"></span> <span>${axisValueLabel}</span> <span>${value}</span>`
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: {
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: fontColor
      },
      data: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
    },
    series: [
      {
        type: 'bar',
        zlevel: 10,
        barWidth: 8,
        itemStyle: {
          borderRadius: 10,
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(1, 85, 255, 0)' },
            { offset: 0.5, color: '#005ea0' },
            { offset: 1, color: 'rgba(0, 193, 255, 1)' }
          ])
        },
        data: seriesData
      },
      {
        type: 'bar',
        barGap: '-100%',
        barWidth: 8,
        itemStyle: {
          color: '#000911',
          borderRadius: 10
        },
        label: {
          show: true,
          position: 'right',
          formatter: params => {
            const { dataIndex } = params
            return `${seriesData[dataIndex]}`
          }
        },
        data: bgSeriesData
      }
    ]
  }
}
