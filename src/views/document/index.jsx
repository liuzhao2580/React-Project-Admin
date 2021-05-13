import React, { useState } from "react"
import { List, Card } from "antd"
const { Meta } = Card

const Document = () => {
  const [documentList] = useState(() => [
    {
      url: "https://react.docschina.org/docs/getting-started.html",
      img: "https://react.docschina.org/favicon.ico",
      title: "React",
    },
    {
      url: "https://ant-design.gitee.io/components/overview-cn/",
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      title: "Ant Design",
    },
  ])
  return (
    <List
      grid={{
        gutter: 10,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 4,
        xxl: 4,
      }}
      dataSource={documentList}
      renderItem={item => (
        <List.Item>
          <Card
            style={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => window.open(item.url)}
            cover={
              <img
                style={{
                  width: "50%",
                  height: "50%",
                  display: "inline-table",
                  marginTop: 20,
                }}
                alt='example'
                src={item.img}
              />
            }
          >
            <Meta title={item.title} description={item.title} />
          </Card>
        </List.Item>
      )}
    />
  )
}

export default Document
