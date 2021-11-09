import { useReducer, useImperativeHandle, forwardRef } from 'react'
import { Modal, Input } from "antd"


interface ICom {
  // ref:any
}

interface IState {
  visible: boolean
}

const initState: IState = {
  /** 弹出框的显示隐藏 */
  visible: false
}

const ACTIONS_TYPE = {
  /** 弹出框的显示隐藏 */
  VISIBLE : 'visible'
}

function reducer (state, action: {type: string, data: any }) {
  switch(action.type) {
    case ACTIONS_TYPE.VISIBLE:
      return {
        ...state,
        visible: action.data
      }
  }
}

const RejectReasonCom = (props: ICom, ref) => {
  const [state, dispatch] = useReducer(reducer, initState)

  useImperativeHandle(ref, ()=> ({
    openModal:()=> {
      dispatch({type: ACTIONS_TYPE.VISIBLE, data: true})
    }
  }), [])

  /** 关闭弹出框 */
  const modelCancel = ()=> {
    dispatch({type: ACTIONS_TYPE.VISIBLE, data: false})
  }
  return (
    <Modal
      title="拒绝原因"
      visible={state.visible}
      onCancel={modelCancel}
    >
      <div className="article-details-com-modal">
        <Input.TextArea rows={4}/>
      </div>
    </Modal>
  )
}

export default forwardRef(RejectReasonCom)
