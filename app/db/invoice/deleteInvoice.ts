import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

interface addInvoiceT {
  plannerJobRef: string
  plannerDate: string
}

export const deleteInvoice = async ({
  plannerJobRef,
  plannerDate,
}: addInvoiceT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'deleteInvoice' })
  }

  const invoiceDocId = `${plannerJobRef}@${plannerDate}`

  try {
    const invoiceDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'invoices',
      invoiceDocId,
    )

    if (!invoiceDocRef) {
      throw new Error('No invoice found')
    }

    const invoiceDoc = await getDoc(invoiceDocRef)

    if (invoiceDoc.exists()) {
      await deleteDoc(invoiceDocRef)
    }
  } catch (error) {
    throw new Error(`Error deleting invoice at deleteInvoice route: ${error}`)
  }
}
