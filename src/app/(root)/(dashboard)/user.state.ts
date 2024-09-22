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
  firstName: '',
  lastName: '',
  creditBalance: 0,
  planId: 0,
  setUser(user) {
    return set(() => ({ ...user }))
  }
}))
export default userStore
