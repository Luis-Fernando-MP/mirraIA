import { type Document } from 'mongodb'

import IUser from './user.type'

interface ITransaction extends Document {
  stripeId: string
  amount: number
  plan?: string
  credits?: number
  buyer?: IUser
  createdAt?: Date
  updatedAt?: Date
}

export default ITransaction
