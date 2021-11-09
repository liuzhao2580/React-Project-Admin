import { useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { UserRolesEnum } from '@/typescript/user/enum'
import IStoreState from '@/typescript/store'

interface ICom {
  children: any
  roleId: UserRolesEnum | Array<UserRolesEnum>
  userRoleId: UserRolesEnum
}
const PermissionCom = (props: ICom) => {
  const { children, roleId, userRoleId } = props
  const [show, setShow] = useState<boolean>(false)
  useLayoutEffect(()=> {
    setShow(()=> false)
    if(roleId instanceof Array) {
      const getFind = roleId.find(value => value === userRoleId)
      if(getFind) {
        setShow(()=> true)
      }
    }
    else if(typeof roleId === 'number') {
      roleId === userRoleId && setShow(()=> true)
    }
  }, [userRoleId])
  return <>{show && children}</>
}

const mapStateToProps = (state: IStoreState): { userRoleId: UserRolesEnum } => {
  return {
    userRoleId: state.user.userInfo.roleId
  }
}

/** 用来设置 权限的显示 */
export default connect(mapStateToProps)(PermissionCom)
