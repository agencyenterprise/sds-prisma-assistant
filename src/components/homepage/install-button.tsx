'use client'

import { Copy } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { StayInformed } from '@/components/stay-informed'
import { track } from '@/lib/analytics'

export function InstallButton() {
  const [open, setOpen] = useState(false)

  const onClick = () => {
    navigator.clipboard.writeText('npx prisma-assistant@latest')
    track('install_button_clicked')
    toast.success('Copied to clipboard', {
      duration: 1400,
    })
    setTimeout(() => setOpen(true), 1500)
  }

  return (
    <div className="flex flex-col gap-y-3">
      <button
        onClick={onClick}
        data-analytics="install-prisma-assistant"
        className="text-lg flex max-w-fit mx-auto bg-[#29F7C5] p-5 rounded-md text-[#172677] gap-4 items-center font-semibold"
      >
        $ npx prisma-assistant@latest
        <Copy size={20} />
      </button>
      <button
        className="max-w-fit mx-auto text-white"
        onClick={() => setOpen(true)}
      >
        📢{' '}
        <span className="underline underline-offset-2 ml-2 font-semibold">
          Keep me in the Loop!
        </span>
      </button>
      {open && <StayInformed defaultOpen onOpenChange={setOpen} />}
    </div>
  )
}
