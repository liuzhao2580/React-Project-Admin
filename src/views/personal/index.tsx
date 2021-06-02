import React, { useEffect } from 'react'
import './index.scss'

import { getUserInfoApi } from '@/api/modules/user'
/** 个人中心页面 */
const PersonalPage = () => {
  useEffect(() => {
    async function getUserInfo() {
      const data = await getUserInfoApi(1)
      console.log(data)
    }
    getUserInfo()
  }, [])
  return <div className="personal-page-box">PersonalPage</div>
}

export default PersonalPage
