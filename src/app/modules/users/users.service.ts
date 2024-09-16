import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { genarateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto genarate incremental id
  const id = await genarateUserId()
  user.id = id

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to Create User')
  }
  return createdUser
}

export default {
  createUser,
}
