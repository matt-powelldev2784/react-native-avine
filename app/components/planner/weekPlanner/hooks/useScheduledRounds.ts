import { useEffect, useState } from 'react'
import { queryRoundsOnDate } from '../../../../db/planner/queryRoundsOnDate'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { RoundWithRelatedJobsT } from '../../../../types/RoundT'

type ScheduledRounds = RoundWithRelatedJobsT[] | []

type UseScheduledRoundsReturn = [boolean, ScheduledRounds]

export const useScheduledRounds = (
  selectedDay: Date,
): UseScheduledRoundsReturn => {
  const [scheduledRounds, setScheduledRounds] = useState<ScheduledRounds>([])
  const [isLoading, seIstLoading] = useState<boolean>(true)

  useEffect(() => {
    const handleScheduledRounds = async () => {
      seIstLoading(true)
      const selectedDayForDb = formatDateForDb(selectedDay)
      const rounds = await queryRoundsOnDate(selectedDayForDb)

      if (rounds) {
        setScheduledRounds(rounds)
        setTimeout(() => {
          seIstLoading(false)
        }, 3000)
      }
    }
    handleScheduledRounds()
  }, [selectedDay])

  return [isLoading, scheduledRounds]
}
