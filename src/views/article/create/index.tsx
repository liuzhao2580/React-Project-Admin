import { useState, useEffect, useCallback, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Button, message } from 'antd'
import E from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import './index.scss'
import PreviewModalCom from './components/Preview-Modal'

import {
  getArticleCategoryByLevelApi,
  getArticleDetailsByIdApi
} from '@/api/modules/article'
import { IArticleCategory } from '@/typescript/article/interface'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { ArticleInsertOrEditModel } from '@/typescript/article/model'
import { EArticleSaveType } from '@/typescript/article/enum'

const ACTIONS_TYPE = {
  /** 编辑器 */
  EDITOR: 'editor',
  /** 用来设置 modal 的显示隐藏 */
  PREVIEWMODEL: 'previewModal',
  /** 监听预览按钮的状态 */
  REVIEWDISABLED: 'reviewDisabled',
  /** 弹出框页面加载状态 */
  MODAL_LOADING: 'modalLoading'
}

class InitialState {
  /** 编辑器 */
  editor: null = null
  /** 用来设置 modal 的显示隐藏 */
  isPreviewModal: boolean = false
  /** 监听预览按钮的状态 */
  reviewBtnDisabled: boolean = false
  /** 弹出框页面加载状态 */
  modalLoading: boolean = true
}

function reducers(
  state: InitialState,
  action: { type: string; data: any }
): any {
  switch (action.type) {
    case ACTIONS_TYPE.EDITOR:
      return {
        ...state,
        editor: action.data
      }
    case ACTIONS_TYPE.PREVIEWMODEL:
      return {
        ...state,
        isPreviewModal: action.data
      }
    case ACTIONS_TYPE.REVIEWDISABLED:
      return {
        ...state,
        reviewBtnDisabled: action.data
      }
    case ACTIONS_TYPE.MODAL_LOADING:
      return {
        ...state,
        modalLoading: action.data
      }
  }
}

const ArticleCreate = () => {
  const history = useHistory()

  const [state, dispatch] = useReducer(reducers, new InitialState())
  // 获取 文章分类的数据
  const [articleCate, setArticleCate] = useState<IArticleCategory[]>([])

  /** 新增 和编辑 数据 实例化 */
  const [articleParams, setArticleParams] = useState<ArticleInsertOrEditModel>(
    () => new ArticleInsertOrEditModel()
  )

  // 初始化 编辑器 、 获取文章分类数据
  useEffect(() => {
    ;(async function () {
      const data = await getArticleCategoryByLevelApi(2)
      if (data.code === ResultCodeEnum.SUCCESS) {
        setArticleCate(data.data)
      } else setArticleCate([])
    })()

    // setEditor(new E('#content'))
    dispatch({ type: ACTIONS_TYPE.EDITOR, data: new E('#content') })
  }, [])

  // 初始化编辑器的配置
  useEffect(() => {
    const { editor } = state
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

    // 初始化 用来获取 url 地址栏的数据
    const getId = history.location.state
    // 说明 是编辑
    if (getId) {
      ;(async function () {
        const data = await getArticleDetailsByIdApi(getId as string)
        if (data.code === ResultCodeEnum.SUCCESS) {
          console.log(data)
          setArticleParams(prev => {
            return {
              ...prev,
              title: data.data.title
            }
          })
          editor?.txt.html(data.data.content)
        }
      })()
    }

    return () => {
      editor && editor.destroy()
    }
  }, [state.editor])

  /** 预览按钮 */
  const previewBtn = useCallback(() => {
    if (!state.editor.txt.text()) {
      return message.warning('请输入正确的内容', 1)
    }
    setArticleParams(prev => {
      return {
        ...prev,
        content: state.editor.txt.html()
      }
    })
    dispatch({ type: ACTIONS_TYPE.PREVIEWMODEL, data: true })
  }, [state.editor])

  // 预览按钮 是否可以点击
  useEffect(() => {
    if (articleParams.title) {
      dispatch({ type: ACTIONS_TYPE.REVIEWDISABLED, data: false })
    } else dispatch({ type: ACTIONS_TYPE.REVIEWDISABLED, data: true })
  }, [articleParams.title])

  /** 保存为草稿 或者 提交 */
  const handleConfirm = async (type: EArticleSaveType) => {
    setArticleParams((prev)=> {
      return {
        ...prev,
        status: type
      }
    })
    console.log(articleParams, 'articleParams')
    // setArticleLoading(true)
    // try {
    //   const data = await articleInsertApi(params)
    //   if (data.code === ResultCodeEnum.SUCCESS) {
    //     message.success('新增成功')
    //     handleCancel()
    //   }
    // } finally {
    //   setArticleLoading(false)
    // }
  }

  return (
    <div className="article-create-box">
      <div className="header-box">
        <Input
          placeholder="请输入文章标题"
          onChange={e =>
            setArticleParams(prev => {
              return {
                ...prev,
                title: e.target.value
              }
            })
          }
          className="title-input"
          value={articleParams.title}
        />
        <div className="btn-box">
          <Button
            type="primary"
            onClick={previewBtn}
            disabled={state.reviewBtnDisabled}
          >
            预览
          </Button>
        </div>
      </div>
      {/* 内容区域 */}
      <div id="content"></div>
      {/* 预览 */}
      <PreviewModalCom
        isModalVisible={state.isPreviewModal}
        articleParams={articleParams}
        articleCateList={articleCate}
        modalLoading={state.modalLoading}
        closeModal={() =>
          dispatch({ type: ACTIONS_TYPE.PREVIEWMODEL, data: false })
        }
        handleConfirm={handleConfirm}
        setArticleCateValue={(type)=> {
          setArticleParams((prev)=> {
            return {
              ...prev,
              categoryId: type
            }
          })
        }}
      ></PreviewModalCom>
    </div>
  )
}
export default ArticleCreate
