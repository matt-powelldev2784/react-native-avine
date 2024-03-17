import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

interface addInvoiceT {
  plannerId: string
}

export const deleteInvoice = async ({ plannerId }: addInvoiceT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'deleteInvoice' })
  }

  try {
    const invoiceDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'invoices',
      plannerId,
    )

    const invoiceDoc = await getDoc(invoiceDocRef)

    if (invoiceDoc.exists()) {
      await deleteDoc(invoiceDocRef)
    }
  } catch (error) {
    throw new Error(`Error deleting invoice at deleteInvoice route: ${error}`)
  }
}
