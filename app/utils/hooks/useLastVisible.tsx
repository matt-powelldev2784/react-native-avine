import { useEffect, useState } from 'react'
import { DocumentSnapshot } from 'firebase/firestore'

export const useLastVisible = (data: any) => {
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null)

  useEffect(() => {
    if (data?.lastVisible) {
      setLastVisible(data.lastVisible)
    }
  }, [data])

  return lastVisible
}
