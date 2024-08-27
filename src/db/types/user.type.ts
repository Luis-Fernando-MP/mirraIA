import { ObjectId } from 'mongoose'

interface IUser {
  _id?: ObjectId
  clerkId: string
  email: string
  username: string
  photo: string
  firstName?: string
  lastName?: string
  planId?: number
  creditBalance?: number
}

export default IUser
