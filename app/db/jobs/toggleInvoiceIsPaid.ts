import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

interface toggleInvoiceIsPaidT {
  plannerDate: string
  jobId: string
  isPaid: boolean
}

export const toggleInvoiceIsPaid = async ({
  jobId,
  plannerDate,
  isPaid,
}: toggleInvoiceIsPaidT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'toggleInvoiceIsPaid' })
  }

  try {
    const plannerDateDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'planner',
      plannerDate,
    )

    // only allow invoice to be toggled if job is complete
    const plannerDoc = await getDoc(plannerDateDocRef)
    if (!plannerDoc.exists()) {
      throw new Error(
        `Error updating job is complete status at toggleInvoiceIsPaid route: planner date doc does not exist`,
      )
    }

    const jobIsComplete = plannerDoc.data().completedJobs.includes(jobId)

    if (jobIsComplete === false) {
      throw new Error('You cannot toggle a job as paid if it is not complete')
    }

    // toggle invoice is paid status
    if (isPaid === true) {
      await updateDoc(plannerDateDocRef, {
        invoicedJobs: arrayUnion(jobId),
      })
      return {
        message: `Invoice for job id ${jobId} set to unpaid`,
        isPaid: true,
      }
    }

    if (isPaid === false) {
      await updateDoc(plannerDateDocRef, {
        invoicedJobs: arrayRemove(jobId),
      })
      return {
        message: `Invoice for job id ${jobId} set to paid`,
        isPaid: false,
      }
    }
  } catch (error) {
    throw new Error(
      `Error updating job is complete status at toggleInvoiceIsPaid route: ${error}`,
    )
  }
}
