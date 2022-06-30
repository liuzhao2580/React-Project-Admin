import React from 'react'
import { connect } from 'react-redux'
import './index.scss'

import InfoCom from './components/InfoCom'
import PersonalHeader from './components/HeaderCom'

import { IUserBaseInfo } from '@/typescript/shared/interface/user'

interface IProps {
  userInfo: IUserBaseInfo
}
/** 个人中心页面 */
const PersonalPage = ({ userInfo }: IProps) => {
  return (
    <div className="personal-page-box">
      <PersonalHeader userInfo={userInfo}/>
      <InfoCom userInfo={userInfo} />
    </div>
  )
}

const mapUserInfoStateToProps = state => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapUserInfoStateToProps)(PersonalPage)
