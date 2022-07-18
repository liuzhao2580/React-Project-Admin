import React from 'react'
import './index.scss'

import InfoCom from './components/InfoCom'
import PersonalHeader from './components/HeaderCom'
import { useStore } from '@/store'

/** 个人中心页面 */
const PersonalPage = () => {
  const { userStore } = useStore()
  const userInfo = userStore.userInfo
  return (
    <div className="personal-page-box">
      <PersonalHeader userInfo={userInfo}/>
      <InfoCom userInfo={userInfo} />
    </div>
  )
}

export default PersonalPage
