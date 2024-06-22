import { useState, useEffect } from 'react'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { getRoundsByPlannerDates } from '../../../../db/planner/getRoundsByPlannerDate/getRoundsByPlannerDates'
import { ExtendedPlannerRoundsDataT } from '../../../../types/RoundT'

const useRoundData = (datesToDisplay: Date[]) => {
  const { selectedDay, plannerNeedsUpdate } = usePlannerContext()
  const [roundData, setRoundData] = useState<ExtendedPlannerRoundsDataT[]>([])
  const [getApiIsLoading, setGetApiIsLoading] = useState(false)

  useEffect(() => {
    const fetchRoundData = async () => {
      setGetApiIsLoading(true)
      const plannerDates = datesToDisplay.map((date: Date) => {
        return formatDateForDb(date)
      })
      try {
        const data = await getRoundsByPlannerDates(plannerDates)
        if (data) setRoundData(data)
      } catch (error) {
        console.error('Failed to fetch round data:', error)
        setRoundData([])
      } finally {
        setGetApiIsLoading(false)
      }
    }

    fetchRoundData()
  }, [datesToDisplay, selectedDay, plannerNeedsUpdate])

  return { roundData, getApiIsLoading }
}

export default useRoundData
