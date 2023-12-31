import { useEffect, useState } from 'react'
import { queryRoundsOnDate } from '../../../../db/planner/queryRoundsOnDate'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { RoundWithRelatedJobsT } from '../../../../types/RoundT'

type ScheduledRounds = RoundWithRelatedJobsT[] | []

export const useScheduledRounds = (selectedDay: Date): ScheduledRounds => {
  const [scheduledRounds, setScheduledRounds] = useState<ScheduledRounds>([])

  useEffect(() => {
    const handleScheduledRounds = async () => {
      const selectedDayForDb = formatDateForDb(selectedDay)
      const rounds = await queryRoundsOnDate(selectedDayForDb)

      if (rounds) {
        setScheduledRounds(rounds)
      }
    }
    handleScheduledRounds()
  }, [selectedDay])

  return scheduledRounds
}
