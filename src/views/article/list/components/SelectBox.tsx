import React, {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react'
import { Input, Row, Col, Cascader, DatePicker, Button, Select } from 'antd'
import { getArticleCategoryByLazyApi } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { ArticleListParamsModel } from '@/typescript/article/model'
import { IArticleCategoryByLazy } from '@/typescript/article/interface'
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader'
import moment from 'moment'
import CustomMapToText from '@/utils/modules/CustomMapToText'

const { RangePicker } = DatePicker

interface ICom {
  params: ArticleListParamsModel
  setParams: Dispatch<SetStateAction<ArticleListParamsModel>>
  // 传递 参数
  selectBtnParams: () => void
  // 重置
  resetBtn: () => void
}
/** 筛选条件 */
const SelectBoxCom = (props: ICom) => {
  const { params, setParams, selectBtnParams, resetBtn } = props
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
    const getStatus = new CustomMapToText().ArticleConst
    let arr: Array<{value: number, label: string}> = []
    getStatus.forEach((item, key) => {
      arr.push({
        value: key,
        label: item
      })
    })
    return arr
  })

  const [cascaderCategory, setCategoryValue] = useState<CascaderValueType>(()=> [])

  
  useEffect(() => {
    loadArticleData()
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
  const inputChange = useCallback(e => {
    setParams((prev)=> {
      return {...prev, ...{title: e.target.value}}
    })
  }, [])

  // 文章状态
  const statusChange = useCallback(value => {
    setParams((prev)=> {
      return {...prev, ...{status: value}}
    })
  }, [])

  /** 文章分类选择器 */
  const categoryChange = (value: CascaderValueType) => {
    setCategoryValue(value)
    setParams((prev)=> {
      return {...prev, categoryId: value[value.length - 1] as string}
    })
  }

  /** 时间选择器改变事件 */
  const timeChange = value => {
    if (!value) return
    setParams((prev)=> {
      return {...prev, ...{time: value.map(item => moment(item).format('YYYY-MM-DD'))}}
    })
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
          value={params.status}
          placeholder="请选择文章状态"
          onChange={statusChange}
          style={{ width: '100%' }}
        ></Select>
      </Col>
      {/* 文章分类 */}
      <Col xs={12} md={6} lg={6} xl={4}>
        <Cascader
          options={articleCategroyList}
          value={cascaderCategory}
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
        <Button type="primary" onClick={()=> {
          setCategoryValue(()=> [])
          resetBtn()
        }}>
          重置
        </Button>
      </Col>
    </Row>
  )
}

export default SelectBoxCom
