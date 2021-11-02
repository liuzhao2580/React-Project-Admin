import React from 'react'
import { Radio, Row, Col, RadioChangeEvent } from 'antd'
import { IArticleCategory } from '@/typescript/article/interface'

interface ICom {
  articleCateList: IArticleCategory[]
  changeArticleCate: (checkedValue: RadioChangeEvent) => void
}

/**
 * 文章分类的多选框
 */
const CategoryRadioCom = (props: ICom) => {
  const { articleCateList,changeArticleCate } = props

  return (
    <div className="article-radio-checkout-com">
      <Radio.Group
        style={{ width: '100%' }}
        onChange={changeArticleCate}
      >
        <Row>
          {articleCateList.map(item => {
            return (
              <Col span={4} key={item.id}>
                <Radio value={item.id}>{item.categoryName}</Radio>
              </Col>
            )
          })}
        </Row>
      </Radio.Group>
    </div>
  )
}

export default CategoryRadioCom
