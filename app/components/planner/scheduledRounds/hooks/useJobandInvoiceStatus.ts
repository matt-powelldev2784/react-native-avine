import { useEffect, useState } from 'react'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'

type relatedInvoices = {
  id: string
  isPaid: boolean
  jobName: string
} | null

interface useJobAndInvoiceStatusT {
  round: RoundWithRecurringFlagT
  relatedInvoices: relatedInvoices[] | null
  plannerCardNeedsUpdate: boolean
}

export const useJobAndInvoiceStatus = ({
  round,
  relatedInvoices,
  plannerCardNeedsUpdate,
}: useJobAndInvoiceStatusT) => {
  const [noJobStatusHasChanged, setNoJobStatusHasChanged] = useState(false)
  const [allJobsAreComplete, setAllJobsAreComplete] = useState(false)
  const [allInvoicesArePaid, setAllInvoicesArePaid] = useState(false)

  useEffect(() => {
    if (relatedInvoices === null) {
      return
    }

    setNoJobStatusHasChanged(
      round.relatedJobs.every((job) => job.jobIsComplete === false),
    )

    setAllJobsAreComplete(
      round.relatedJobs.every((job) => job.jobIsComplete === true),
    )

    if (relatedInvoices.length !== round.relatedJobs.length) {
      return
    }

    setAllInvoicesArePaid(
      relatedInvoices.every((invoice) => {
        if (invoice === null) {
          return false
        }
        return invoice.isPaid === true
      }),
    )
  }, [round.relatedJobs, relatedInvoices, plannerCardNeedsUpdate])

  return { noJobStatusHasChanged, allJobsAreComplete, allInvoicesArePaid }
}
