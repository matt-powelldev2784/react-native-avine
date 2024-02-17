import { useEffect, useState } from 'react'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'
import { RoundWithRelatedJobsT } from '../../../../../../types/RoundT'
import { getRoundsandJobsByPlannerDate } from './../../../../../../db/planner/getRoundsandJobsByPlannerDate'

type ScheduledRounds = RoundWithRelatedJobsT[] | []

type UseScheduledRoundsReturn = [boolean, ScheduledRounds]

interface UseScheduledRoundsProps {
  selectedDay: Date
}

export const useScheduledRounds = ({
  selectedDay,
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
      } else {
        seIsError(true)
      }
    }
    handleScheduledRounds()
  }, [selectedDay])

  return [isError, scheduledRounds]
}
