import React, { useState, useLayoutEffect } from 'react'
import { UserRolesEnum } from '@/typescript/shared/enum/user'
import { useStore } from '@/store'
interface ICom {
  children: any
  /** 传入的用户权限id */
  roleId?: UserRolesEnum | Array<UserRolesEnum>
  /** 满足条件即可的权限 */
  permissionFlag?: boolean
}
const PermissionCom = ({
  children,
  roleId,
  permissionFlag,
}: ICom) => {
  const [show, setShow] = useState<boolean>(false)
  const { userStore } = useStore()
  const userRoleId = userStore.userInfo.roleId
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

/** 用来设置 权限的显示 */
export default PermissionCom
