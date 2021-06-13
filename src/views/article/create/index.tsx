import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import E from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import './index.scss'
import PreviewModalCom from './components/Preview-Modal'

const ArticleCreate = () => {
  const [editor, setEditor] = useState<any | null>(null)
  // 用来设置 modal 的显示隐藏
  const [isPreviewModal, setPreviewModal] = useState<Boolean>(false)

  // 初始化 编辑器
  useEffect(() => {
    setEditor(new E('#content'))
  }, [])

  useEffect(() => {
    if (!editor) return
    // 配置 zindex
    editor.config.zIndex = 500
    // 图片上传的格式为 base64
    editor.config.uploadImgShowBase64 = true
    // 设置编辑区域高度为 500px
    editor.config.height = 500
    // 配置代码高亮
    editor.highlight = hljs
    editor.create()

    return () => {
      editor && editor.destroy()
    }
  }, [editor])
  console.log(123)

  /** 预览按钮 */
  const previewBtn = () => {
    console.log(editor.txt.html())
    setPreviewModal(true)
  }
  return (
    <div className="article-create-box">
      <div className="header-box">
        <Input placeholder="请输入文章标题" className="title-input" />
        <div className="btn-box">
          <Button type="primary" onClick={previewBtn}>
            预览
          </Button>
        </div>
      </div>
      {/* 内容区域 */}
      <div id="content"></div>
      {/* 预览 */}
      <PreviewModalCom
        isModalVisible={isPreviewModal}
        closeModal={() => setPreviewModal(false)}
      ></PreviewModalCom>
    </div>
  )
}
export default ArticleCreate
