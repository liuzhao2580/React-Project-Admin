import React from "react"
import { Row, Col, Card } from "antd"
import funnyImg from "@/assets/images/funny.png"
const homeCard = () => {
  return (
    <div className='home-card-box'>
      <Row gutter={16}>
        {[1, 2, 3, 4].map(item => {
          return (
            <Col key={item} xs={24} sm={12} md={12} lg={6} xl={6}>
              <Card className='card-item' hoverable>
                <div className='card-div'>
                  <img src={funnyImg} alt='' />
                  <span>小火车况且况且</span>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default homeCard
