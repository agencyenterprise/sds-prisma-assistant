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

export function StayInformed({
  children,
  defaultOpen = false,
  onOpenChange: _onOpenChange,
}: PropsWithChildren<{
  defaultOpen?: boolean
  onOpenChange?: (value: boolean) => void
}>) {
  const [open, setOpen] = React.useState(defaultOpen)
  const onOpenChange = (value: boolean) => {
    setOpen(value)
    _onOpenChange?.(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && (
        <DialogTrigger>
          <button
            className="w-full text-left"
            data-analytics="banner-prisma-assistant"
          >
            {children}
          </button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Stay informed</DialogTitle>
          <DialogDescription>
            We&apos;ll notify you when we&apos;re out of Alpha!
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
        <Button
          disabled={!isValidEmail(email || '')}
          onClick={onSubmit}
          data-analytics="get-notified-prisma-assistant"
        >
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
