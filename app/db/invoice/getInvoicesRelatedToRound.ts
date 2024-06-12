import { auth } from '../../../firebaseConfig'
import { RoundWithRecurringFlagT } from '../../types/RoundT'
import { authError } from '../authError'

import { getInvoice } from './getInvoice'

interface getInvoicesRelatedToRoundT {
  round: RoundWithRecurringFlagT
  plannerDate: string
}

type FulfilledInvoice = PromiseFulfilledResult<{
  id: string
  isPaid: boolean
  jobName: string
} | null>

export const getInvoicesRelatedToRound = async ({
  round,
  plannerDate,
}: getInvoicesRelatedToRoundT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'getgetInvoicesRelatedToRoundInvoice' })
  }

  try {
    const roundRecurringFlag = round.recurringRound
      ? 'recurringRound'
      : 'oneOffRound'
    const relatedJobs = round.relatedJobs

    const invoicesPromises = relatedJobs.map(async (job) => {
      const invoiceId = `${round.id}@${job.id}@${roundRecurringFlag}@${plannerDate}`
      const invoice = await getInvoice(invoiceId)

      if (!invoice) {
        return null
      }

      return {
        id: invoice.id,
        isPaid: invoice.isPaid,
        jobName: invoice.job.jobName,
      }
    })

    const invoices = await Promise.allSettled(invoicesPromises)
    const fulfilledInvoices = invoices.filter(
      (invoice): invoice is FulfilledInvoice => invoice.status !== 'rejected',
    )
    const fulfilledInvoicesData = fulfilledInvoices.map(
      (invoice) => invoice.value,
    )

    return fulfilledInvoicesData
  } catch (error) {
    throw new Error(
      `Error getting invoices at getInvoicesRelatedToRound route: ${error}`,
    )
  }
}
