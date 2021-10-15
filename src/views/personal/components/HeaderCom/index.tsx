import React, { useState } from 'react'
import ChangeAvatarCom from './ChangeAvatarCom'

/** 个人中心页面 */
const PersonalHeader = ({ userInfo }) => {
  return (
    <>
      <header className="personal-header-box">
        <div className="header-img-box">
          <ChangeAvatarCom avatar={userInfo.avatar}/>
        </div>
        <p className="nick-name">{userInfo.nickName}</p>
      </header>

      
    </>
  )
}

export default PersonalHeader
