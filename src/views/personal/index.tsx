import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './index.scss'

/** 个人中心页面 */
const PersonalPage = ({ userInfo }) => {
  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])
  return (
    <div className="personal-page-box">
      {userInfo && (
        <header className="header-box">
          <img src={userInfo.avatar} alt="" className="avatar-box" />
          <p className="nick-name">{userInfo.nickName}</p>
        </header>
      )}
    </div>
  )
}

const mapUserInfoStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapUserInfoStateToProps)(PersonalPage)
