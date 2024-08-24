import { Model, Schema, model, models } from 'mongoose'

import IUser from '../types/user.type'

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  planId: {
    type: Number,
    default: 1
  },
  creditBalance: {
    type: Number,
    default: 10
  }
})

const User: Model<IUser> = models?.User || model('User', UserSchema)

export default User
