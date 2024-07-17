import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { authError } from '../../authError'

interface InvoiceIsPaidT {
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
}: InvoiceIsPaidT) => {
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

    // if job is complete return jobIsInvoiced true property
    if (plannerData?.invoicedJobs?.includes(relatedJobString)) {
      const invoiceIsPaid = true
      return { invoiceIsPaid }
    }

    // if job is not complete return jobIsInvoiced false property
    if (plannerData?.relatedJobs?.includes(relatedJobString)) {
      const invoiceIsPaid = false
      return { invoiceIsPaid }
    }

    return { invoiceIsPaid: false }

  } catch (error) {
    throw new Error(
      `Error getting invoice is complete at getInvoiceIsPaid route: ${error}`,
    )
  }
}
