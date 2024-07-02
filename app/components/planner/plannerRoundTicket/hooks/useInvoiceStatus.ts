import { useEffect, useState } from 'react'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'

interface useJobAndInvoiceStatusProps {
  round: RoundWithRecurringFlagT | undefined
}

type boolOrNull = boolean | null

export const useInvoiceStatus = ({ round }: useJobAndInvoiceStatusProps) => {
  const [allJobsPaid, setAllJobsPaid] = useState<boolOrNull>(null)
  const { plannerCardNeedsUpdate } = usePlannerContext()

  useEffect(() => {
    if (!round) {
      return
    }

    setAllJobsPaid(round.relatedJobs.every((job) => job.jobIsPaid === true))
  }, [round, plannerCardNeedsUpdate])

  //----------------------------------------------------------------------------------

  return {
    allJobsPaid,
  }
}
