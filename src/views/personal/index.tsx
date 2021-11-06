import { connect } from 'react-redux'
import './index.scss'

import InfoCom from './components/InfoCom'
import PersonalHeader from './components/HeaderCom'

/** 个人中心页面 */
const PersonalPage = ({ userInfo }) => {
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
