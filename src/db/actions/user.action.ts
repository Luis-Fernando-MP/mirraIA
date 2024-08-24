'use server'

import { handleError } from '@/shared/utils'
import { revalidatePath } from 'next/cache'

import db from '..'
import User from '../models/User'
import IUser from '../types/user.type'

export async function createUser(user: IUser) {
  try {
    await db()
    const isCreated = await User.create(user)
    if (!isCreated) throw new Error('Ups!! there are an Error to create new user')
    return isCreated
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(clerkId: string) {
  try {
    await db()
    const user = await User.findOne({ clerkId })
    if (!user) throw new Error('The user not found')
    return user
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(clerkId: string, user: any) {
  try {
    await db()
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true
    })
    if (!updatedUser) throw new Error('User update failed')
    return updatedUser
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await db()
    const isDeleted = await User.findOneAndDelete({ clerkId })
    if (!isDeleted) {
      throw new Error('Fail to deled user')
    }
    revalidatePath('/')
    return isDeleted
  } catch (error) {
    handleError(error)
  }
}

export async function updateCredits(clerkId: string, credits: number) {
  try {
    await db()
    const isUpdated = await User.findOneAndUpdate(
      { clerkId },
      { $inc: { creditBalance: credits } },
      { new: true }
    )
    if (!isUpdated) throw new Error('User credits update failed')
    return isUpdated
  } catch (error) {
    handleError(error)
  }
}
