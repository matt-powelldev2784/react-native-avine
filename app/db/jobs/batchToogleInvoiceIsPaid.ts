import { auth } from '../../../firebaseConfig'
import { RoundWithRecurringFlagT } from '../../types/RoundT'
import { authError } from '../authError'
import { toggleInvoiceIsPaid } from './toggleInvoiceIsPaid'

interface batchToggleInvoiceIsPaidT {
  round: RoundWithRecurringFlagT
  plannerDate: string
}

export const batchToggleInvoiceIsPaid = async ({
  round,
  plannerDate,
}: batchToggleInvoiceIsPaidT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'batchToggleInvoiceIsPaid' })
  }

  try {
    const roundRecurringFlag = round.recurringRound
      ? 'recurringRound'
      : 'oneOffRound'
    const relatedJobs = round.relatedJobs

    relatedJobs.forEach(async (job) => {
      const plannerDocRef = `${round.id}@${job.id}@${roundRecurringFlag}`

      await toggleInvoiceIsPaid({
        plannerDocRef,
        plannerDate,
        isPaid: true,
      })
    })
  } catch (error) {
    throw new Error(
      `Error updating invoice is Paid status at batchToggleInvoiceIsPaid route: ${error}`,
    )
  }
}
