// useFetchJobs.ts
import { useEffect, useState } from 'react'
import { getAllRounds } from '../../../../db/rounds/getAllRounds'

interface RoundOption {
  label: string
  value: string
}

export const useFetchRounds = () => {
  const [userRounds, setUserRounds] = useState<RoundOption[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRounds()
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
