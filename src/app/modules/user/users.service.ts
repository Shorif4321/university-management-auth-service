import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto genated increamental id need

  const id = await generateUserId()
  user.id = id // user er modde id set korlam

  // default_sudent_password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create User!')
  }

  return createdUser
}

export default {
  createUser,
}
