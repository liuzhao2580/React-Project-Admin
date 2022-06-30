import React from 'react'
import { connect } from 'react-redux'
import IStoreState from '@/typescript/store'
import { MUserInfo } from '@/typescript/shared/model/user'

interface IProps {
  userInfo: MUserInfo
}

const AdminManagement = ({ userInfo }: IProps) => {
  console.log(userInfo, 'userInfo')
  return (
    <div>1234</div>
  )
}

const mapStateToProps = (state: IStoreState)=> {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(AdminManagement)
