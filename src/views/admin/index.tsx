import React, { useEffect, useState } from 'react'
import { Radio, RadioChangeEvent } from 'antd'
import './index.scss'
import { EnumFieldToTransformText } from '@/utils'
import { UserRolesEnum, UserRolesTextEnum } from '@/typescript/shared/enum/user'
import { useStore } from '@/store'


const AdminManagement = () => {
  const { userStore } = useStore()
  const userInfo = userStore.userInfo
  const getCurrentRoleText = EnumFieldToTransformText(
    UserRolesEnum,
    UserRolesTextEnum,
    userInfo.roleId
  )
  const [radioValue, setRadioValue] = useState<number>(userInfo.roleId)

  useEffect(() => {
    setRadioValue(userInfo.roleId)
  }, [userInfo.roleId])

  /** radio 的点击改变事件 */
  const radioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value)
  }
  return (
    <div className="admin-management-box">
      <div className="admin-management-box-header">
        <span>当前的角色: </span>
        <span className="admin-management-box-header-text">
          {getCurrentRoleText}
        </span>
      </div>
      <div className='admin-management-box-radio'>
        <span>切换用户的权限: </span>
        <Radio.Group
          value={radioValue}
          buttonStyle="solid"
          onChange={radioChange}
        >
          {Object.keys(UserRolesTextEnum).map((item, index) => {
            return (
              <Radio.Button value={UserRolesEnum[item]} key={index}>
                {UserRolesTextEnum[item]}
              </Radio.Button>
            )
          })}
        </Radio.Group>
      </div>
    </div>
  )
}

export default AdminManagement
