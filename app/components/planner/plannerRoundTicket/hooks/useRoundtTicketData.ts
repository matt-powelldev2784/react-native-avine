import { useEffect, useState } from 'react'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { getPlannerRoundTicket } from '../../../../db/planner/getRoundsByPlannerDate/getPlannerRoundTicket'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'
import { getInvoicesRelatedToRound } from '../../../../db/invoice/getInvoicesRelatedToRound'

type relatedInvoicesT = { id: string; isPaid: boolean; jobName: string }[]

export const useRoundTicketData = () => {
  const [round, setRound] = useState<RoundWithRecurringFlagT>()
  const [relatedInvoices, setRelatedInvoices] = useState<relatedInvoicesT>()
  const [noJobStatusHasChanged, setNoJobStatusHasChanged] = useState(false)
  const [allJobsAreComplete, setAllJobsAreComplete] = useState(false)
  const [allInvoicesArePaid, setAllInvoicesArePaid] = useState(false)
  const { selectedRound, plannerCardNeedsUpdate } = usePlannerContext()

  useEffect(() => {
    if (!relatedInvoices || !round) {
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
  }, [round?.relatedJobs, relatedInvoices, plannerCardNeedsUpdate])

  //----------------------------------------------------------------------------------

  useEffect(() => {
    if (!selectedRound) return

    const getPlannerTicketData = async () => {
      const round = await getPlannerRoundTicket({
        plannerDate: selectedRound?.plannerDate,
        roundId: selectedRound?.roundId,
        recurringRound: selectedRound?.recurringRound,
      })

      if (round) setRound(round as RoundWithRecurringFlagT)
    }
    getPlannerTicketData()
  }, [selectedRound])

  //----------------------------------------------------------------------------------

  useEffect(() => {
    if (!round) return

    const getInvoiceData = async () => {
      const relatedInvoiceData = await getInvoicesRelatedToRound({
        round,
        plannerDate: selectedRound?.plannerDate || '',
      })

      if (relatedInvoiceData)
        setRelatedInvoices(relatedInvoiceData as relatedInvoicesT)
    }

    getInvoiceData()
  }, [round, selectedRound?.plannerDate])

  //----------------------------------------------------------------------------------

  return {
    round,
    noJobStatusHasChanged,
    allJobsAreComplete,
    allInvoicesArePaid,
  }
}
