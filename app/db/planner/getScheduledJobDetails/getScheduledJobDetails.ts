import { auth } from '../../../../firebaseConfig'
import { authError } from '../../authError'
import { getJob } from '../../jobs/getJob'
import { getJobIsComplete } from '../getJobIsComplete/getJobIsComplete'
import { getInvoiceIsPaid } from '../getInvoiceIsPaid/getInvoiceIsPaid'
import { getClient } from '../../clients/getClient'

interface getScheduledJobDetailsT {
  roundId: string
  jobId: string
  plannerDate: string
  recurringRound: boolean
}

export const getScheduledJobDetails = async ({
  roundId,
  jobId,
  plannerDate,
  recurringRound,
}: getScheduledJobDetailsT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getScheduledJobDetails' })
  }

  try {
    const job = await getJob(jobId)
    const isPaid = await getInvoiceIsPaid({
      roundId,
      jobId,
      plannerDate,
      recurringRound,
    })
    const isComplete = await getJobIsComplete({
      roundId,
      jobId,
      plannerDate,
      recurringRound,
    })
    const client = await getClient(job.clientId)

    return {
      job,
      isPaid: isPaid.invoiceIsPaid,
      isComplete: isComplete.jobIsComplete,
      client,
    }
  } catch (error) {
    throw new Error(
      `Error getting job details at getScheduledJobDetails route: ${error}`,
    )
  }
}
