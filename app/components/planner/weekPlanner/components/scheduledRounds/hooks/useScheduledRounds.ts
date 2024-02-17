import React, { useEffect, useState } from 'react'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'
import { RoundWithRelatedJobsT } from '../../../../../../types/RoundT'
import { getRoundsandJobsByPlannerDate } from './../../../../../../db/planner/getRoundsandJobsByPlannerDate'

type ScheduledRounds = RoundWithRelatedJobsT[] | []

type UseScheduledRoundsReturn = [boolean, ScheduledRounds]

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
  const [scheduledRounds, setScheduledRounds] = useState<ScheduledRounds>([])
  const [isError, seIsError] = useState<boolean>(false)

  useEffect(() => {
    const handleScheduledRounds = async () => {
      seIsError(false)
      const selectedDayForDb = formatDateForDb(selectedDay)
      const rounds = await getRoundsandJobsByPlannerDate(selectedDayForDb)

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
