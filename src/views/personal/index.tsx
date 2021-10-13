import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './index.scss'

import InfoCom from './components/InfoCom'

/** 个人中心页面 */
const PersonalPage = ({ userInfo }, props) => {
  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])
  console.log(props, 'props')
  return (
    <div className="personal-page-box">
      <header className="header-box">
        <img src={userInfo.avatar} alt="" className="avatar-box" />
        <p className="nick-name">{userInfo.nickName}</p>
      </header>
      <InfoCom userInfo={userInfo}/>
    </div>
  )
}

const mapUserInfoStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapUserInfoStateToProps)(PersonalPage)
