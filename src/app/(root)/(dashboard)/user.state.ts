import IUser from '@/db/types/user.type'
import { create } from 'zustand'

interface IUserStore extends IUser {
  setUser: (user: IUser) => void
}

const userStore = create<IUserStore>(set => ({
  clerkId: '',
  email: '',
  photo: '',
  username: '',
  setUser(user) {
    return set(() => ({ ...user }))
  }
}))
export default userStore
