import { useEffect, useState } from 'react'
import { queryRoundsOnDate } from '../../../../../../db/planner/queryRoundsOnDate'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'
import { RoundWithRelatedJobsT } from '../../../../../../types/RoundT'

type ScheduledRounds = RoundWithRelatedJobsT[] | []

type UseScheduledRoundsReturn = [boolean, ScheduledRounds]

export const useScheduledRounds = (
  selectedDay: Date,
  refreshData: boolean,
): UseScheduledRoundsReturn => {
  const [scheduledRounds, setScheduledRounds] = useState<ScheduledRounds>([])
  const [isError, seIsError] = useState<boolean>(false)

  useEffect(() => {
    const handleScheduledRounds = async () => {
      seIsError(false)
      const selectedDayForDb = formatDateForDb(selectedDay)
      const rounds = await queryRoundsOnDate(selectedDayForDb)

      if (rounds) {
        setScheduledRounds(rounds)
      } else {
        seIsError(true)
      }
    }
    handleScheduledRounds()
  }, [selectedDay, refreshData])

  return [isError, scheduledRounds]
}
