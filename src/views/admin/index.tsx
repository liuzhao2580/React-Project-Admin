import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Radio, RadioChangeEvent } from 'antd'
import IStoreState from '@/typescript/store'
import { MUserInfo } from '@/typescript/shared/model/user'
import { EnumFieldToTransformText } from '@/utils'
import { UserRolesEnum, UserRolesTextEnum } from '@/typescript/shared/enum/user'

interface IProps {
  userInfo: MUserInfo
}

const AdminManagement = ({ userInfo }: IProps) => {
  const getCurrentRoleText = EnumFieldToTransformText(
    UserRolesEnum,
    UserRolesTextEnum,
    userInfo.roleId
  )
  const [radioValue, setRadioValue] = useState<number>(()=>userInfo.roleId)
  
  console.log(userInfo.roleId, '1234')
  // useEffect(()=> {
  //   setRadioValue(userInfo.roleId)
  // }, [userInfo.roleId])

  /** radio 的点击改变事件 */
  const radioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value)
  }
  return (
    <div className="admin-management-box">
      <h2>{getCurrentRoleText}</h2>
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
  )
}

const mapStateToProps = (state: IStoreState) => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(AdminManagement)
