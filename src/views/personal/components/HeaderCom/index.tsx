import React, { useState } from 'react'
import ChangeAvatarCom from './ChangeAvatarCom'

/** 个人中心页面 */
const PersonalHeader = ({ userInfo }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  /**
   * 更换头像
   */
  const changeAvatar = () => {
    setModalVisible(true)
  }
  return (
    <>
      <header className="personal-header-box">
        <div className="header-img-box">
          <img src={userInfo.avatar} alt="" className="avatar-box" />
          <span className="img-hover-bgc" onClick={changeAvatar}>
            更换头像
          </span>
        </div>
        <p className="nick-name">{userInfo.nickName}</p>
      </header>

      <ChangeAvatarCom
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
      />
    </>
  )
}

export default PersonalHeader
