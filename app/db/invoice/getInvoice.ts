import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { InvoiceWithIdT } from '../../types/InvoiceT'

export const getInvoice = async (
  invoiceId: string,
): Promise<InvoiceWithIdT> => {
  if (auth.currentUser === null) {
    return authError({ filename: 'getInvoice' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const invoiceDocRef = doc(userDoc, 'invoices', invoiceId)

    const invoiceDoc = await getDoc(invoiceDocRef)
    const invoiceData = invoiceDoc.data() as InvoiceWithIdT

    return { ...invoiceData, id: invoiceDoc.id }
  } catch (error) {
    throw new Error(`Error getting invoice at getInvoice route: ${error}`)
  }
}
