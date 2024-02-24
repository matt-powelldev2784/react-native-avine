import React, { useEffect, useState } from 'react'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'
import { RoundWithRecurringFlagT } from '../../../../../../types/RoundT'
import { getRoundsByPlannerDate } from '../../../../../../db/planner/getRoundsByPlannerDate/getRoundsByPlannerDate'

type ScheduledRoundsT = RoundWithRecurringFlagT[] | []

type UseScheduledRoundsReturn = [boolean, ScheduledRoundsT]

interface UseScheduledRoundsProps {
  selectedDay: Date
  refreshData: boolean
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>
}

export const useScheduledRounds = ({
  selectedDay,
  refreshData,
  setRefreshData,
}: UseScheduledRoundsProps): UseScheduledRoundsReturn => {
  const [scheduledRounds, setScheduledRounds] = useState<ScheduledRoundsT>([])
  const [isError, seIsError] = useState<boolean>(false)

  useEffect(() => {
    const handleScheduledRounds = async () => {
      seIsError(false)
      const selectedDayForDb = formatDateForDb(selectedDay)
      const rounds = await getRoundsByPlannerDate(selectedDayForDb)

      if (rounds) {
        setScheduledRounds(rounds)
        setRefreshData(false)
      } else {
        seIsError(true)
      }
    }
    handleScheduledRounds()
  }, [selectedDay, refreshData, setRefreshData])

  return [isError, scheduledRounds]
}
