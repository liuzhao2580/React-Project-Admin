import React, { useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { UserRolesEnum } from '@/typescript/shared/enum/user'
import IStoreState from '@/typescript/store'

interface ICom {
  children: any
  /** 传入的用户权限id */
  roleId?: UserRolesEnum | Array<UserRolesEnum>
  /** 满足条件即可的权限 */
  permissionFlag?: boolean
  userRoleId: UserRolesEnum
}
const PermissionCom = ({
  children,
  roleId,
  permissionFlag,
  userRoleId
}: ICom) => {
  const [show, setShow] = useState<boolean>(false)
  useLayoutEffect(() => {
    setShow(() => false)
    if (permissionFlag) {
      setShow(() => true)
      return
    }
    if (roleId instanceof Array) {
      const getFind = roleId.find(value => value === userRoleId)
      if (getFind) {
        setShow(() => true)
      }
    } else if (typeof roleId === 'number') {
      roleId === userRoleId && setShow(() => true)
    }
  }, [userRoleId, permissionFlag])
  return <>{show && children}</>
}

const mapStateToProps = (state: IStoreState): { userRoleId: UserRolesEnum } => {
  return {
    userRoleId: state.user.userInfo.roleId
  }
}

/** 用来设置 权限的显示 */
export default connect(mapStateToProps)(PermissionCom)
