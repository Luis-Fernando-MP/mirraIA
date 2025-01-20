import { User } from '@prisma/client'
import { create } from 'zustand'

interface IStoreUser {
  setUser: (user: User) => void
}

const userStore = create<User & IStoreUser>(set => ({
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
  setUser(user: User) {
    return set(() => ({ ...user }))
  }
}))
export default userStore
