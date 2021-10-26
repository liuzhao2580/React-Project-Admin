import IAppState  from "./modules/app"
import IUserState from "./modules/user"

interface IStoreState {
  app: IAppState,
  user: IUserState
}

export default IStoreState
