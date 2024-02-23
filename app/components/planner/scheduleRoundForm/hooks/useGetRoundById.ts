import { useEffect, useState } from 'react'
import { getRound } from '../../../../db/rounds/getRound'
import { RoundWithIdT } from '../../../../types/RoundT'

export const useGetRoundById = (roundId: string) => {
  const [round, setRound] = useState<RoundWithIdT | null>(null)

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const fetchedRound: RoundWithIdT | null = await getRound(roundId)
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
