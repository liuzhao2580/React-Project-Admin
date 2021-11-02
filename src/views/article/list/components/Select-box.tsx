import React, { useState, useEffect, useCallback } from 'react'
import { Input, Row, Col, Cascader, DatePicker, Button, Select } from 'antd'
import { getArticleCategoryByLazyApi } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { EArticleStatus } from '@/typescript/article/enum'
import { deepCype } from '@/utils'
import { ArticleListParamsModel } from '@/typescript/article/model'
import { IArticleCategoryByLazy } from '@/typescript/article/interface'
import { CascaderOptionType } from 'antd/lib/cascader'
import moment from 'moment'

const { RangePicker } = DatePicker

interface ICom {
  params: ArticleListParamsModel
  // 传递 参数
  selectBtnParams: () => void
}
/** 筛选条件 */
const SelectBoxCom = (props: ICom) => {
  const { params, selectBtnParams } = props
  // 分类数据传递的参数
  let cascaderParams: IArticleCategoryByLazy = {
    level: 1,
    parentId: ''
  }
  // 获取分类数据
  const [articleCategroyList, setCategoryList] = useState<CascaderOptionType[]>(
    () => []
  )
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
    loadArticleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /** 动态获取文章分类的数据 */
  const loadArticleData = async (selectedOptions?: CascaderOptionType[]) => {
    let targetOption: CascaderOptionType = {}
    if (selectedOptions) {
      cascaderParams = {
        level: cascaderParams.level + 1,
        parentId: selectedOptions[0].value as string
      }
      targetOption = selectedOptions[selectedOptions.length - 1]
    }
    targetOption.loading = true
    const data = await getArticleCategoryByLazyApi(cascaderParams)
    if (data.code === ResultCodeEnum.SUCCESS) {
      if (cascaderParams.level === 1) {
        setCategoryList(() => {
          return data.data.map(item => {
            return {
              label: item.categoryName,
              value: item.id,
              isLeaf: false
            }
          })
        })
      } else {
        targetOption.children = data.data.map(item => {
          return {
            label: item.categoryName,
            value: item.id,
            isLeaf: true
          }
        })
        targetOption.loading = false
        setCategoryList([...articleCategroyList])
      }
    }
  }

  /** 关键字查询 */
  const inputChange = e => {
    params.title = e.target.value
  }
  // 文章状态
  const statusChange = useCallback(value => {
    params.status = +value
  }, [])
  /** 文章分类选择器 */
  const categoryChange = (value) => {
    params.categoryId = value[value.length - 1]
  }

  /** 时间选择器改变事件 */
  const timeChange = (value) => {
    if(!value) return
    params.time = value.map(item => moment(item).format("YYYY-MM-DD"))
  }

  return (
    <Row gutter={12}>
      <Col xs={12} md={6} lg={6} xl={4}>
        <Input
          placeholder="请输入文章标题"
          value={params.title}
          onChange={inputChange}
        />
      </Col>
      {/* 文章状态 */}
      <Col xs={12} md={6} lg={6} xl={4}>
        <Select
          options={articleStatusList}
          placeholder="请选择文章状态"
          onChange={statusChange}
          style={{ width: '100%' }}
        ></Select>
      </Col>
      {/* 文章分类 */}
      <Col xs={12} md={6} lg={6} xl={4}>
        <Cascader
          options={articleCategroyList}
          placeholder="请选择文章分类"
          loadData={loadArticleData}
          onChange={categoryChange}
          changeOnSelect
          style={{ width: '100%' }}
        />
      </Col>
      {/* 时间选择器 */}
      <Col xs={12} md={6} lg={6} xl={6}>
        <RangePicker style={{ width: '100%' }} onChange={timeChange} />
      </Col>
      {/* 按钮 */}
      <Col xs={12} md={6} lg={6} xl={4}>
        <Button
          type="primary"
          style={{ marginRight: '10px' }}
          onClick={selectBtnParams}
        >
          查询
        </Button>
        <Button type="primary">重置</Button>
      </Col>
    </Row>
  )
}

export default SelectBoxCom
