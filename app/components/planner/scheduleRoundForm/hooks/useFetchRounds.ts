// useFetchJobs.ts
import { useEffect, useState } from 'react'
import { getRoundsFromDb } from '../../../../db/rounds/getRoundsFromDb'

interface RoundOption {
  label: string
  value: string
}

export const useFetchRounds = () => {
  const [userRounds, setUserRounds] = useState<RoundOption[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRoundsFromDb()
      const roundOptions = data?.map((round) => ({
        value: round.id,
        label: round.roundName,
      }))
      if (roundOptions) {
        setUserRounds(roundOptions)
      }
    }

    fetchData()
  }, [])

  return userRounds
}
