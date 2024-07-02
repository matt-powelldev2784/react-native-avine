import { useEffect, useState } from 'react'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'

interface useJobAndInvoiceStatusProps {
  round: RoundWithRecurringFlagT | undefined
}

type boolOrNull = boolean | null

export const useJobStatus = ({ round }: useJobAndInvoiceStatusProps) => {
  const [allJobsAreComplete, setAllJobsAreComplete] = useState<boolOrNull>(null)
  const { plannerCardNeedsUpdate } = usePlannerContext()

  useEffect(() => {
    if (!round) {
      return
    }

    setAllJobsAreComplete(
      round.relatedJobs.every((job) => job.jobIsComplete === true),
    )
  }, [round, plannerCardNeedsUpdate])

  //----------------------------------------------------------------------------------

  return {
    allJobsAreComplete,
  }
}
