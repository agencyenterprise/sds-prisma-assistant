'use client'

import * as React from 'react'
import { PropsWithChildren, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function StayInformed({ children }: PropsWithChildren) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="w-full text-left">{children}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Stay informed</DialogTitle>
          <DialogDescription>
            We&apos;ll notify you about new features and updates.
          </DialogDescription>
        </DialogHeader>
        <Form
          onSuccess={() => {
            setOpen(false)
            toast.success(
              'All Set. We will notify you about new features and updates.',
            )
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

function Form({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')

  async function onSubmit() {
    const body = `userGroup=${encodeURIComponent('Prisma Assistant')}&email=${encodeURIComponent(email)}`

    const response = await fetch(process.env.NEXT_PUBLIC_LOOPS_ENDPOINT!, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (response.ok) {
      onSuccess()
    } else {
      toast.error((await response.json())?.message)
    }
  }

  return (
    <>
      <div>
        <input
          type="email"
          placeholder="you@example.com"
          className="text-black text-sm mt-0 mx-0 w-full bg-white border border-[#d1d5db] focus:outline-none rounded-md px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <DialogFooter className="items-center">
        <Button disabled={!isValidEmail(email || '')} onClick={onSubmit}>
          Get notified!
        </Button>
      </DialogFooter>
    </>
  )
}

function isValidEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}
