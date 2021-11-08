import { useEffect, useState, useRef, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'

import { IArticleBasic } from '@/typescript/article/interface'
import { ResultCodeEnum } from '@/typescript/shared/enum'
import { getArticleDetailsByIdApi } from '@/api/modules/article'
import { Button, Input } from 'antd'

const enum ACTION_TYPE {
  /** 右键菜单的top left */
  CONTEXT_STYLE = 'contextStyle',
  /** 选中的文字 */
  CONTEXT_TEXT = 'contextText',
  /** 填入的问题说明 */
  PROBLEM_DESC = 'problemDesc'
}

const initState = {
  /** 右键菜单的top left */
  contextStyle: {
    display: 'none',
    top: 0,
    left: 0
  },
  /** 选中的文字 */
  contextText: '',
  /** 填入的问题说明 */
  problemDesc: ''
}

function reducer(state = initState, action: { type: ACTION_TYPE; data: any }) {
  switch (action.type) {
    case ACTION_TYPE.CONTEXT_STYLE:
      return {
        ...state,
        contextStyle: action.data
      }
    case ACTION_TYPE.CONTEXT_TEXT:
      return {
        ...state,
        contextText: action.data
      }
    case ACTION_TYPE.PROBLEM_DESC:
      return {
        ...state,
        problemDesc: action.data
      }
  }
}

/** 文章审核 */
const ArticleReviceCom = () => {
  const history = useHistory()

  const [articleDetails, setArticleDetails] = useState<IArticleBasic>()

  const [state, dispatch] = useReducer(reducer, initState)

  const articleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async function () {
      const id = history.location.state
      const data = await getArticleDetailsByIdApi(id as string)
      if (data.code === ResultCodeEnum.SUCCESS) {
        setArticleDetails(data.data)
      }
    })()
  }, [])

  useEffect(() => {
    if (articleRef.current) {
      articleRef.current.onmouseup = e => {
        // 获取鼠标选中的数据
        const getSelected = window.getSelection()?.toString()
        if (getSelected) {
          e.preventDefault()
          dispatch({
            type: ACTION_TYPE.CONTEXT_TEXT,
            data: getSelected
          })
          console.log(e)
          const { x, y } = e
          console.log(x, y)
          dispatch({
            type: ACTION_TYPE.CONTEXT_STYLE,
            data: {
              display: 'block',
              top: y,
              left: x
            }
          })
        }
      }
    }

    return () => {
      if (articleRef.current) {
        articleRef.current.onmouseup = null
      }
    }
  }, [articleRef.current])

  /** 问题说明输入框改变事件 */
  const problemInputChange = (e)=> {
    dispatch({type: ACTION_TYPE.PROBLEM_DESC, data: e.target.value})
  }

  /** 确定按钮 */
  const contextConfirm = () => {
    console.log(state.problemDesc, '1235')
    // dispatch({
    //   type: ACTION_TYPE.CONTEXT_STYLE,
    //   data: {
    //     display: 'none'
    //   }
    // })
  }

  /** 取消按钮 */
  const contextCancel = ()=> {
    dispatch({
      type: ACTION_TYPE.CONTEXT_STYLE,
      data: {
        display: 'none'
      }
    })
    dispatch({type: ACTION_TYPE.PROBLEM_DESC, data: ''})
  }

  return (
    <>
      {articleDetails && (
        <div className="article-review-com">
          <div className="article-review-com-header">
            <div className="article-review-com-header-title">
              {articleDetails.title}
            </div>
            <div className="article-review-com-header-main">
              <div className="article-review-com-header-main-left">
                <div className="article-review-com-header-main-left-top">
                  <div className="article-review-com-header-main-left-top-nickName mr10">
                    {articleDetails.nickName}
                  </div>
                  <div className="article-review-com-header-main-left-top-update-time">
                    {articleDetails.updateTime}
                  </div>
                </div>
                <div className="article-review-com-header-main-left-bottom mt10">
                  <div className="article-review-com-header-main-left-bottom-category mr10">
                    <span className="article-review-com-header-main-left-bottom-category-title mr10">
                      一级分类:
                    </span>
                    <span className="article-review-com-header-main-left-bottom-category-name">
                      {articleDetails.categoryParentName}
                    </span>
                  </div>
                  <div className="article-review-com-header-main-left-bottom-category">
                    <span className="article-review-com-header-main-left-bottom-category-title mr10">
                      二级分类:
                    </span>
                    <span className="article-review-com-header-main-left-bottom-category-name">
                      {articleDetails.categoryName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="article-review-com-container"
            ref={articleRef}
            dangerouslySetInnerHTML={{ __html: articleDetails.content }}
          ></div>

          {/* 鼠标右键 */}
          <div
            className="article-review-com-context-menu-box"
            style={state.contextStyle}
          >
            {/* 选中的文字说明 */}
            <span className="article-review-com-context-menu-box-selected">{state.contextText}</span>
            <Input.TextArea className="article-review-com-context-menu-box-input" onChange={problemInputChange} value={state.problemDesc}/>
            <div className="article-review-com-context-menu-box-button">
              <Button
                type="primary"
                size="small"
                className="mr10 mt10"
                onClick={contextConfirm}
              >
                确定
              </Button>
              <Button
                type="default"
                size="small"
                onClick={contextCancel}
              >
                取消
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ArticleReviceCom
