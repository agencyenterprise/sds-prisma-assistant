'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getChats(userId?: string | null) {
  return []
}

export async function getChat(id: string, userId: string) {
  return {
    id,
    messages: [],
  }
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  return null
}

export async function shareChat(id: string) {
  return {
    error: 'Something went wrong',
  }
}
