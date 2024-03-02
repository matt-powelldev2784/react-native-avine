// useFetchJobs.ts
import { getAllRounds } from '../../../../db/rounds/getAllRounds'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import { RoundWithRelatedJobIdsT } from '../../../../types/RoundT'
import { useEffect, useState } from 'react'

interface RoundOption {
  label: string
  value: string
}

export const useGetRoundOptions = () => {
  const [rounds, setRounds] = useState<RoundOption[]>([])
  const { data } = useGetApiData({
    apiFunction: async () => getAllRounds(),
  })

  useEffect(() => {
    const fetchRounds = async () => {
      if (!data) return

      const allRounds = data as RoundWithRelatedJobIdsT[]

      const roundOptions: RoundOption[] = allRounds?.map((round) => ({
        value: round.id,
        label: round.roundName,
      }))

      setRounds(roundOptions)
    }
    fetchRounds()
  }, [data])

  return rounds
}
