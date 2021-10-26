import React from 'react'
import ChangeAvatarCom from './ChangeAvatarCom'

/** 个人中心页面组件 */
const PersonalHeader = ({ userInfo }) => {
  return (
    <>
      <header className="personal-header-box">
        <div className="header-img-box">
          <ChangeAvatarCom userInfo={userInfo}/>
        </div>
        <p className="nick-name">{userInfo.nickName}</p>
      </header>
    </>
  )
}

export default PersonalHeader
