import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

type Props = {
  compact?: boolean
}

export default function Banner({ compact }: Props) {
  return (
    <Link
      href="https://ae.studio/ai-solutions?utm_source=sds&utm_medium=referral&utm_campaign=wordle-you-vs-gpt&utm_content=top-bar&utm_term=3ff5251a-e107-4d47-bfb8-b2962debd252"
      target="_blank"
      data-analytics="learn-more-about-ae-link"
      className="flex flex-col md:flex-row bg-[#010203] text-white p-3 md:p-2.5 justify-center items-center font-semibold gap-1 md:gap-2 text-sm md:h-11 focus:outline-none"
    >
      <span>
        Made with 🧡 by{' '}
        <span className="underline underline-offset-2 font-bold">
          AE Studio.
        </span>
      </span>
      <span className={twMerge(compact && 'short:hidden')}>
        See what we could build for you. ↗️
      </span>
    </Link>
  )
}
