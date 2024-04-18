import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { getJob } from '../jobs/getJob'
import { convertPlannerDateToShortDate } from '../../utils/convertPlannerDateToShortDate'
import { addInvoiceId } from './addInvoiceId'

interface addInvoiceT {
  plannerId: string
  plannerDate: string
}

export const addInvoice = async ({ plannerId, plannerDate }: addInvoiceT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'addInvoice' })
  }

  try {
    const roundId = plannerId.split('@')[0]
    const jobId = plannerId.split('@')[1]
    const roundType = plannerId.split('@')[2]

    const invoiceDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'invoices',
      plannerId,
    )

    const invoiceDoc = await getDoc(invoiceDocRef)

    const job = await getJob(jobId)

    if (!invoiceDoc.exists()) {
      const newInvoiceId = await addInvoiceId()

      await setDoc(invoiceDocRef, {
        invoiceId: newInvoiceId,
        relatedRound: roundId,
        relatedJob: jobId,
        roundType: roundType,
        completedDate: plannerDate,
        job: job,
        price: job.price,
        description: `Window cleaning on services completed on ${convertPlannerDateToShortDate(
          plannerDate,
        )}`,
        isPaid: false,
      })
    }

    // if (invoiceDoc.exists()) {
    //   await updateDoc(invoiceDocRef, {
    //     relatedRound: roundId,
    //     relatedJob: jobId,
    //     roundType: roundType,
    //     completedDate: plannerDate,
    //     job: job,
    //     isPaid: false,
    //   })
    // }
  } catch (error) {
    throw new Error(`Error adding invoice at addInvoice route: ${error}`)
  }
}
