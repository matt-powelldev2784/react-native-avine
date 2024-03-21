import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

interface updateInvoiceT {
  id: string
  price: number
  description: string
  clientId: string
}

export const updateInvoice = async ({
  id,
  clientId,
  price,
  description,
}: updateInvoiceT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'updateInvoice' })
  }

  console.log('id', id)

  try {
    const invoiceDocRef = doc(db, 'users', auth.currentUser.uid, 'invoices', id)

    const invoiceDoc = await getDoc(invoiceDocRef)
    const invoiceData = invoiceDoc.data()

    if (!invoiceDoc || !invoiceData) {
      throw new Error('Invoice does not exist')
    }

    if (invoiceData.isPaid === true) {
      throw new Error(
        'You cannot edit a invoice which has been marked as paid.',
      )
    }

    await updateDoc(invoiceDocRef, {
      clientId,
      price,
      description,
      job: { ...invoiceData.job, clientId: clientId },
    })
  } catch (error) {
    throw new Error(`Error updating invoice at updateInvoice route: ${error}`)
  }
}
