import { User } from '@prisma/client'
import { create } from 'zustand'

interface IUserStore extends User {
  setUser: (user: User) => void
}

const userStore = create<IUserStore>(set => ({
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
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
