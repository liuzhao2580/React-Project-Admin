import { IUserBaseInfo } from '@/typescript/user/interface'
import CustomConst from '@/utils/modules/CustomConst'
import ChangeAvatarCom from './ChangeAvatarCom'
interface ICom {
  userInfo: IUserBaseInfo
}

/** 个人中心页面组件 */
const PersonalHeader = (props: ICom) => {
  const {userInfo} = props
  return (
    <>
      <header className="personal-header-box">
        <div className="header-img-box">
          <ChangeAvatarCom userInfo={userInfo}/>
        </div>
        <p className="nick-name">{userInfo.nickName}</p>
        <span className="personal-header-box-role">{new CustomConst().UserConst.get(userInfo.roleId)}</span>
      </header>
    </>
  )
}

export default PersonalHeader
