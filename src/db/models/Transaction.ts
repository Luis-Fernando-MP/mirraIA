import { Model, Schema, model, models } from 'mongoose'

import ITransaction from '../types/transaction.type'

const TransactionSchema = new Schema<ITransaction>({
  createdAt: {
    type: Date,
    default: Date.now
  },
  stripeId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  plan: {
    type: String
  },
  credits: {
    type: Number
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Transaction: Model<ITransaction> =
  models?.Transaction || model('Transaction', TransactionSchema)

export default Transaction
