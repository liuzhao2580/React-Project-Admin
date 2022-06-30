import React from 'react'
import { connect } from 'react-redux'
import IStoreState from '@/typescript/store'
import { MUserInfo } from '@/typescript/shared/model/user'
import { EnumFieldToTransformText } from '@/utils'
import { UserRolesEnum, UserRolesTextEnum } from '@/typescript/shared/enum/user'

interface IProps {
  userInfo: MUserInfo
}

const AdminManagement = ({ userInfo }: IProps) => {
  const getCurrentRoleId = EnumFieldToTransformText(
    UserRolesEnum,
    UserRolesTextEnum,
    userInfo.roleId
  )
  return <div>{getCurrentRoleId}</div>
}

const mapStateToProps = (state: IStoreState) => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(AdminManagement)
