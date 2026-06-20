import { useMediaQuery } from '@vueuse/core'

export function useSize() {
  const isMobile = useMediaQuery('(max-width: 430px)')
  const isDesktop = useMediaQuery('(min-width: 430px)')

  return {
    isMobile,
    isDesktop,
  }
}
