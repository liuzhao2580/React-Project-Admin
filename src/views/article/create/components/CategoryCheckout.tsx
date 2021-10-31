import React from 'react'
import { Checkbox, Row, Col } from 'antd'
import { IArticleCategory } from '@/typescript/article/interface'

interface ICom {
  articleCateList: IArticleCategory[]
}

/**
 * 文章分类的多选框
 */
const CategoryCheckoutCom = (props: ICom) => {
  const { articleCateList } = props

  const onChange = () => {}

  return (
    <div className="article-category-checkout-com">
      <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
        <Row>
          {articleCateList.map(item => {
            return (
              <Col span={4} key={item.id}>
                <Checkbox value={item.id}>{item.categoryName}</Checkbox>
              </Col>
            )
          })}
        </Row>
      </Checkbox.Group>
    </div>
  )
}

export default CategoryCheckoutCom
