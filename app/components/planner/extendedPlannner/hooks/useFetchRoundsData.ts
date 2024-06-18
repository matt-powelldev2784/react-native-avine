import { useEffect, useState } from 'react'
import { getRoundsByPlannerDates } from '../../../../db/planner/getRoundsByPlannerDate/getRoundsByPlannerDates'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { ExtendedPlannerRoundsDataT } from '../../../../types/RoundT'

export const useFetchRoundsData = (datesToDisplay: Date[]) => {
  const [roundData, setRoundData] = useState<ExtendedPlannerRoundsDataT[] | []>(
    [],
  )

  useEffect(() => {
    const plannerDates = datesToDisplay.map((date) => {
      return formatDateForDb(date)
    })

    const getRoundData = async () => {
      const data = (await getRoundsByPlannerDates(
        plannerDates,
      )) as ExtendedPlannerRoundsDataT[]

      setRoundData(data)
    }
    getRoundData()
  }, [datesToDisplay])

  return { roundData }
}
