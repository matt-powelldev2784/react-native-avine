import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { addInvoice } from '../invoice/addInvoice'
import { deleteInvoice } from '../invoice/deleteInvoice'

interface toggleJobIsCompleteT {
  plannerDate: string
  jobId: string
  isComplete: boolean
}

export const toggleJobIsComplete = async ({
  jobId,
  plannerDate,
  isComplete,
}: toggleJobIsCompleteT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'toggleJobIsComplete' })
  }

  try {
    const plannerDateDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'planner',
      plannerDate,
    )
    // only allow job is complete toggle if invoice is not paid
    const plannerDoc = await getDoc(plannerDateDocRef)
    if (!plannerDoc.exists()) {
      throw new Error(
        `Error updating job is complete status at toggleInvoiceIsPaid route: planner date doc does not exist`,
      )
    }

    const invoiedJobs = plannerDoc?.data()?.invoicedJobs

    const jobIsInvoiced = invoiedJobs ? invoiedJobs.includes(jobId) : false

    if (jobIsInvoiced === true) {
      throw new Error(
        'You cannnot toggle a job as incomplete if the invoice has been paid.',
      )
    }

    if (isComplete === true) {
      await updateDoc(plannerDateDocRef, {
        completedJobs: arrayUnion(jobId),
      })
      await addInvoice({ plannerId: `${jobId}@${plannerDate}`, plannerDate })
      return { message: `Job id ${jobId} set to complete`, isComplete: true }
    }

    if (isComplete === false) {
      await updateDoc(plannerDateDocRef, {
        completedJobs: arrayRemove(jobId),
      })
      await deleteInvoice({ plannerId: `${jobId}@${plannerDate}` })
      return { message: `Job id ${jobId} set to incomplete`, isComplete: false }
    }
  } catch (error) {
    throw new Error(
      `Error updating job is complete status at toggleJobIsComplete route: ${error}`,
    )
  }
}
