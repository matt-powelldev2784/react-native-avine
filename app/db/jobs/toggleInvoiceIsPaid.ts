import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
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
