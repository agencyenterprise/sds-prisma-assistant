import posthog from 'posthog-js'

export interface Dict {
  [key: string]: any
}

const token = process.env.NEXT_PUBLIC_POSTHOG_TOKEN?.trim()
const debug = process.env.NEXT_PUBLIC_POSTHOG_DEBUG === 'true'

const enabled = Boolean(token)

function run(fn: () => void) {
  try {
    enabled && fn()
  } catch (e) {
    console.error(e)
  }
}

export function init() {
  if (typeof window !== 'undefined' && token) {
    posthog.init(token, {
      api_host: 'https://app.posthog.com',
      autocapture: true,
      capture_pageview: false,
      debug,
    })
  }
}

export function track(name: string, properties?: Dict) {
  run(() => {
    posthog.capture(name, properties)
  })
}

export function trackFn(name: string, properties?: Dict) {
  return () => track(name, properties)
}

export function pageView() {
  track('$pageview')
}
