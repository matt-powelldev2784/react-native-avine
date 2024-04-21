import { doc, setDoc, getDoc} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { getJob } from '../jobs/getJob'
import { convertPlannerDateToShortDate } from '../../utils/convertPlannerDateToShortDate'
import { addInvoiceId } from './addInvoiceId'

interface addInvoiceT {
  plannerJobRef: string
  plannerDate: string
}

export const addInvoice = async ({
  plannerJobRef,
  plannerDate,
}: addInvoiceT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'addInvoice' })
  }

  try {
    const roundId = plannerJobRef.split('@')[0]
    const jobId = plannerJobRef.split('@')[1]
    const roundType = plannerJobRef.split('@')[2]
    const invoiceDocId = `${plannerJobRef}@${plannerDate}`

    const invoiceDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'invoices',
      invoiceDocId,
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
