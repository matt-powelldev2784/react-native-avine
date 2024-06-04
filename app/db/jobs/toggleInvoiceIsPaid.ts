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
  plannerDocRef: string
  isPaid: boolean
}

export const toggleInvoiceIsPaid = async ({
  plannerDocRef,
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

    const invoiceDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'invoices',
      `${plannerDocRef}@${plannerDate}`,
    )

    // only allow invoice to be toggled if job is complete
    const plannerDoc = await getDoc(plannerDateDocRef)
    if (!plannerDoc.exists()) {
      throw new Error(
        `Error updating job is complete status at toggleInvoiceIsPaid route: planner date doc does not exist`,
      )
    }

    const completeJobs = plannerDoc.data().completedJobs
    const jobIsComplete = completeJobs
      ? completeJobs.includes(plannerDocRef)
      : false

    if (jobIsComplete === false) {
      throw new Error('You cannot toggle a job as paid if it is not complete')
    }

    // toggle invoice is paid status
    if (isPaid === true) {
      await updateDoc(plannerDateDocRef, {
        invoicedJobs: arrayUnion(plannerDocRef),
      })
      await updateDoc(invoiceDocRef, {
        isPaid: true,
      })
      return {
        message: `Invoice for planner doc ${plannerDocRef} set to unpaid`,
        isPaid: true,
      }
    }

    if (isPaid === false) {
      await updateDoc(plannerDateDocRef, {
        invoicedJobs: arrayRemove(plannerDocRef),
      })
      await updateDoc(invoiceDocRef, {
        isPaid: false,
      })
      return {
        message: `Invoice for planner doc ${plannerDocRef} set to paid`,
        isPaid: false,
      }
    }
  } catch (error) {
    throw new Error(
      `Error updating invoice is paid status at toggleInvoiceIsPaid route: ${error}`,
    )
  }
}
