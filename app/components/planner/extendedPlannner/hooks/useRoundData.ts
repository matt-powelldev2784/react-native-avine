import { useState, useEffect } from 'react'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { getRoundsByPlannerDates } from '../../../../db/planner/getRoundsByPlannerDate/getRoundsByPlannerDates'
import { ExtendedPlannerRoundsDataT } from '../../../../types/RoundT'
import useGetApiData from '../../../../utils/hooks/useGetApiData'

const useRoundData = (datesToDisplay: Date[]) => {
  const { selectedDay, plannerNeedsUpdate } = usePlannerContext()
  const [roundData, setRoundData] = useState<ExtendedPlannerRoundsDataT[]>([])

  const plannerDates = datesToDisplay.map((date: Date) => {
    return formatDateForDb(date)
  })

  const { data, getApiIsLoading } = useGetApiData({
    apiFunction: async () => getRoundsByPlannerDates(plannerDates),
    selectedDay,
  })

  useEffect(() => {
    setRoundData(data as ExtendedPlannerRoundsDataT[])
  }, [data, plannerNeedsUpdate])


  return { roundData, getApiIsLoading }
}

export default useRoundData
