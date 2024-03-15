import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { authError } from '../../authError'
import { getJob } from '../../jobs/getJob'

interface JobIsCompleteT {
  roundId: string
  jobId: string
  plannerDate: string
  recurringRound: boolean
}

export const getInvoiceIsPaid = async ({
  roundId,
  jobId,
  plannerDate,
  recurringRound,
}: JobIsCompleteT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getInvoiceIsPaid' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const plannerDoc = doc(userDoc, 'planner', plannerDate)
    const relatedJobSuffix = recurringRound ? 'recurringRound' : 'oneOffRound'

    const plannerSnapshot = await getDoc(plannerDoc)

    if (!plannerSnapshot.exists()) {
      throw new Error('Scheduled job not found in planner')
    }

    const plannerData = plannerSnapshot.data()

    const relatedJobString = `${roundId}@${jobId}@${relatedJobSuffix}`

    // if job is complete return job with jobIsComplete true property
    if (plannerData?.invoicedJobs?.includes(relatedJobString)) {
      const job = await getJob(jobId)
      const jobIsInvoiced = true
      return { ...job, jobIsInvoiced }
    }

    // if job is not complete return job with jobIsComplete false property
    if (plannerData?.invoicedJobs?.includes(relatedJobString)) {
      const job = await getJob(jobId)
      const jobIsInvoiced = false
      return { ...job, jobIsInvoiced }
    }

    //if job not found in planner throw error
    throw new Error('Scheduled job not found in planner')
  } catch (error) {
    throw new Error(
      `Error getting job is complete at getInvoiceIsPaid route: ${error}`,
    )
  }
}
