import { doc, collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { InvoiceWithIdT } from '../../types/InvoiceT'
import { authError } from '../authError'

export const getDueInvoices = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'getDueInvoices' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const invoiceCollection = collection(userDoc, 'invoices')

    const q = query(invoiceCollection, where('isPaid', '==', false))
    const querySnapshot = await getDocs(q)

    const invoices = querySnapshot.docs.map((invoice) => ({
      id: invoice.id,
      ...invoice.data(),
    })) as InvoiceWithIdT[]

    const sortedInvoices = invoices.sort((a, b) => {
      const aSortable = `${a.completedDate.slice(4)}${a.completedDate.slice(
        2,
        4,
      )}${a.completedDate.slice(0, 2)}`
      const bSortable = `${b.completedDate.slice(4)}${b.completedDate.slice(
        2,
        4,
      )}${b.completedDate.slice(0, 2)}`
      return aSortable.localeCompare(bSortable)
    })

    return sortedInvoices
  } catch (error) {
    throw new Error(
      `Error getting unpaid invoices at getDueInvoices route: ${error}`,
    )
  }
}
