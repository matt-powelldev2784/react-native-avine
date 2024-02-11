import { useEffect, useState } from 'react'
import { getRoundById } from '../../../../db/rounds/getRoundById'
import { RoundWithIdT } from '../../../../types/RoundT'

export const useGetRoundById = (roundId: string) => {
  const [round, setRound] = useState<RoundWithIdT | null>(null)

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const fetchedRound: RoundWithIdT | null = await getRoundById(roundId)
        setRound(fetchedRound)
      } catch (error) {
        console.error('Error fetching round:', error)
        setRound(null)
      }
    }

    if (roundId) {
      fetchRound()
    }
  }, [roundId])

  return round
}
