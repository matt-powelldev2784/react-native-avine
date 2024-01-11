import { useState, useEffect } from 'react'
import { JobWithIdT } from '../../../../../../../types/JobT'

interface useIsCompleteProps {
  job: JobWithIdT
  plannerDate: string
}

export const useIsComplete = ({ job, plannerDate }: useIsCompleteProps) => {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const dates = Object.entries(job.scheduledDatesInfo).filter((date) => {
      return date[1].date === plannerDate
    })[0]

    if (dates) {
      const isCompleteFromDb = dates[1].isComplete
      if (isCompleteFromDb) {
        setIsComplete(true)
      }
    }
  }, [job, plannerDate])

  return isComplete
}
