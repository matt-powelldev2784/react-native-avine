import { auth } from '../../../../firebaseConfig'
import { authError } from '../../authError'
import { getJob } from '../../jobs/getJob'
import { getJobIsComplete } from '../getJobIsComplete/getJobIsComplete'
import { getInvoiceIsPaid } from '../getInvoiceIsPaid/getInvoiceIsPaid'

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
    const isPaidDetails = await getInvoiceIsPaid({
      roundId,
      jobId,
      plannerDate,
      recurringRound,
    })
    const isCompleteDetails = await getJobIsComplete({
      roundId,
      jobId,
      plannerDate,
      recurringRound,
    })

    return { ...job, ...isPaidDetails, ...isCompleteDetails }
  } catch (error) {
    throw new Error(
      `Error getting job details at getScheduledJobDetails route: ${error}`,
    )
  }
}
