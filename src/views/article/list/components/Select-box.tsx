import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Cascader, DatePicker, Button, Select } from 'antd'
import { getArticleCategoryApi } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { EArticleStatus } from '@/typescript/article/enum'
import { deepCype } from '@/utils'

const { RangePicker } = DatePicker
/** 筛选条件 */
const SelectBoxCom = () => {
  // 获取分类数据
  const [articleCategroyList, setCategoryList] = useState<any[]>([])
  // 获取文章状态
  const [articleStatusList] = useState<any[]>(() => {
    const getEnum = deepCype(EArticleStatus)
    let arr: any[] = []
    for (const key in getEnum) {
      if (Object.prototype.hasOwnProperty.call(getEnum, key)) {
        const element = getEnum[key]
        if (typeof element === 'string') {
          arr.push({
            value: key,
            label: element
          })
        }
      }
    }
    return arr
  })
  useEffect(() => {
    initData()
  }, [])
  /** 获取文章分类的数据 */
  const initData = async () => {
    const params = {
      level: 1,
      id: undefined
    }
    const data = await getArticleCategoryApi(params)
    if (data.code === ResultCodeEnum.SUCCESS) {
      const getOptionList = data.data.map(item => {
        return {
          value: item.id,
          label: item.category,
          isLeaf: false
        }
      })
      setCategoryList(getOptionList)
    }
  }
  /** 动态获取文章分类的数据 */
  const loadArticleData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    const params = {
      level: 2,
      id: targetOption.value
    }
    const data = await getArticleCategoryApi(params)
    if (data.code === ResultCodeEnum.SUCCESS) {
      if (data.data.length) {
        targetOption.children = data.data.map(item => {
          return {
            value: item.id,
            label: item.category,
            isLeaf: true
          }
        })
      } else {
        targetOption.isLeaf = true
      }
    }
    targetOption.loading = false
    setCategoryList([...articleCategroyList])
    console.log(targetOption)
  }
  function onChange(value) {
    console.log(value)
  }
  return (
    <Row gutter={12}>
      <Col xs={12} md={6} lg={6} xl={4}>
        <Input placeholder="请输入关键字" />
      </Col>
      {/* 文章状态 */}
      <Col xs={12} md={6} lg={6} xl={4}>
        <Select
          options={articleStatusList}
          placeholder="请选择文章状态"
          onChange={onChange}
          style={{ width: '100%' }}
        ></Select>
      </Col>
      {/* 文章分类 */}
      <Col xs={12} md={6} lg={6} xl={4}>
        <Cascader
          options={articleCategroyList}
          placeholder="请选择文章分类"
          loadData={loadArticleData}
          onChange={onChange}
          changeOnSelect
          style={{ width: '100%' }}
        />
      </Col>
      {/* 时间选择器 */}
      <Col xs={12} md={6} lg={6} xl={6}>
        <RangePicker style={{ width: '100%' }} />
      </Col>
      {/* 按钮 */}
      <Col xs={12} md={6} lg={6} xl={4}>
        <Button type="primary" style={{ marginRight: '10px' }}>
          查询
        </Button>
        <Button type="primary">重置</Button>
      </Col>
    </Row>
  )
}

export default SelectBoxCom
