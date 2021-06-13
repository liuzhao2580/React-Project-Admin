import React, { useState, useEffect, useCallback } from 'react'
import { Input, Button, message } from 'antd'
import E from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import './index.scss'
import PreviewModalCom from './components/Preview-Modal'

import { getArticleCategoryApi } from '@/api/modules/article'
import { IArticleCategory } from '@/typescript/article/interface'
import { ResultCodeEnum } from '@/typescript/shared/enum'

const ArticleCreate = () => {
  // 实例化 编辑器
  const [editor, setEditor] = useState<any>()
  // 用来设置 modal 的显示隐藏
  const [isPreviewModal, setPreviewModal] = useState<boolean>(false)
  // 获取 文章分类的数据
  const [articleCate, setArticleCate] = useState<IArticleCategory[]>([])
  // 监听预览按钮的状态
  const [reviewBtnDisabled, setReviewBtnDisabled] = useState<boolean>(true)
  // 文章标题输入框的内容
  const [titleInputValue, setTitleInputValue] = useState<any>(null)
  // 文章的内容
  const [articleContent, setArticleContent] = useState(null)

  // 初始化 编辑器 、 获取文章分类数据
  useEffect(() => {
    ;(async function () {
      const data = await getArticleCategoryApi({ level: 2 })
      console.log(data)
      if (data.code === ResultCodeEnum.success) {
        setArticleCate(data.data)
      } else setArticleCate([])
    })()

    setEditor(new E('#content'))
  }, [])
  // 初始化编辑器的配置
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
  /** 预览按钮 */
  const previewBtn = useCallback(() => {
    if (!editor.txt.text()) {
      return message.warning('请输入正确的内容', 1)
    }
    setArticleContent(editor.txt.html())
    setPreviewModal(true)
  }, [editor])

  // 预览按钮 是否可以点击
  useEffect(() => {
    if (titleInputValue) {
      setReviewBtnDisabled(false)
    } else setReviewBtnDisabled(true)
  }, [titleInputValue])
  return (
    <div className="article-create-box">
      <div className="header-box">
        <Input
          placeholder="请输入文章标题"
          onChange={e => setTitleInputValue(e.target.value)}
          className="title-input"
          value={titleInputValue}
        />
        <div className="btn-box">
          <Button
            type="primary"
            onClick={previewBtn}
            disabled={reviewBtnDisabled}
          >
            预览
          </Button>
        </div>
      </div>
      {/* 内容区域 */}
      <div id="content"></div>
      {/* 预览 */}
      <PreviewModalCom
        isModalVisible={isPreviewModal}
        articleCateList={articleCate}
        articleContent={articleContent}
        articleTitle={titleInputValue}
        closeModal={() => setPreviewModal(false)}
      ></PreviewModalCom>
    </div>
  )
}
export default ArticleCreate
