/* eslint-disable @typescript-eslint/naming-convention */
import { createUser, deleteUser, updateUser } from '@/db/actions/user.action'
import IUser from '@/db/types/user.type'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

import UserEvent from './user.event.type'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Hey you!! WEBHOOK KEY NOTFOUND 🤓')
  }

  const headerPayload = headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent | UserEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  const eventType = evt.type
  console.log('nuevo evento: ', eventType)

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data
    const user: IUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username ?? '',
      firstName: first_name ?? '',
      lastName: last_name ?? '',
      photo: image_url ?? ''
    }
    const newUser = await createUser(user)
    console.log(newUser)

    // if (newUser) {
    //   await clerkClient.users.updateUserMetadata(id, {
    //     publicMetadata: {
    //       userId: newUser._id
    //     }
    //   })
    // }
    return NextResponse.json({ message: 'OK', user: newUser })
  }

  if (eventType === 'user.updated') {
    const { id, image_url, first_name, last_name, username } = evt.data

    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username!,
      photo: image_url
    }
    const updatedUser = await updateUser(id, user)
    return NextResponse.json({ message: 'OK', user: updatedUser })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data
    const deletedUser = await deleteUser(id!)
    return NextResponse.json({ message: 'OK', user: deletedUser })
  }

  return new Response('Some...', { status: 200 })
}
