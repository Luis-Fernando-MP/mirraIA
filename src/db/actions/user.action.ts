'use server'

import { handleError } from '@/shared/lib/utils'
import { User } from '@prisma/client'

import prisma from '..'

export async function createUser(user: User) {
  try {
    const existUser = await prisma.user.findUnique({
      where: { clerkId: user.clerkId }
    })
    if (existUser) throw new Error('The user exist')
    const isCreated = await prisma.user.create({ data: user })
    if (!isCreated) throw new Error('Ups!! there are an Error to create new user')
    return isCreated
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId }
    })
    if (!user) throw new Error('The user not found')
    return user
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(clerkId: string, userData: any) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: userData
    })
    if (!updatedUser) throw new Error('User update failed')
    return updatedUser
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { clerkId }
    })
    return deletedUser
  } catch (error) {
    handleError(error)
  }
}

export async function updateCredits(clerkId: string, credits: number) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: {
        creditBalance: {
          increment: credits
        }
      }
    })
    if (!updatedUser) throw new Error('User credits update failed')
    return updatedUser
  } catch (error) {
    handleError(error)
  }
}
