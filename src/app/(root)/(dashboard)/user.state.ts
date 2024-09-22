import { User } from '@prisma/client'
import { create } from 'zustand'

interface IUserStore extends Partial<User> {
  setUser: (user: User) => void
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
