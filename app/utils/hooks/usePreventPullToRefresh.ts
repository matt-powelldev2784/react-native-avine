import { useEffect } from 'react'
import { Platform } from 'react-native'

export default function usePreventPullToRefresh() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const preventDefault = (e: TouchEvent) => {
        if (window.scrollY === 0) {
          e.preventDefault()
        }
      }

      document.body.addEventListener('touchmove', preventDefault, {
        passive: false,
      })

      return () => {
        document.body.removeEventListener('touchmove', preventDefault)
      }
    }
  }, [])
}
