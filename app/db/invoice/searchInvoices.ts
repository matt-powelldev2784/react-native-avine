import {
  doc,
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  getCountFromServer,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { DocumentSnapshot } from 'firebase/firestore'
import { splitStringToLowerCaseArray } from '../../utils/splitStringToLowerCaseArray'
import { InvoiceWithIdT } from '../../types/InvoiceT'

interface SearchInvoicesT {
  searchField: string
  searchTerm: string
  lastVisible: DocumentSnapshot | null
  isPaid: boolean
}

export const searchInvoices = async ({
  searchField,
  searchTerm,
  lastVisible = null,
  isPaid,
}: SearchInvoicesT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'searchInvoices' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const invoiceCollection = collection(userDoc, 'invoices')
    const searchTerms = splitStringToLowerCaseArray(searchTerm)

    //get clients data
    let q
    if (lastVisible) {
      q = query(
        invoiceCollection,
        where(searchField, 'array-contains-any', searchTerms),
        where('isPaid', '==', isPaid),
        orderBy('invoiceId'),
        startAfter(lastVisible),
        limit(10),
      )
    } else {
      q = query(
        invoiceCollection,
        where(searchField, 'array-contains-any', searchTerms),
        where('isPaid', '==', isPaid),
        orderBy('invoiceId'),
        limit(10),
      )
    }

    const querySnapshot = await getDocs(q)

    const invoices = querySnapshot.docs.map((invoice) => ({
      id: invoice.id,
      ...invoice.data(),
    })) as InvoiceWithIdT[]

    // sort invoices by completedDate
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

    // get document count
    const countQuery = query(
      invoiceCollection,
      where(searchField, 'array-contains-any', searchTerms),
      where('isPaid', '==', isPaid),
      orderBy('invoiceId'),
    )
    const snapshot = await getCountFromServer(countQuery)
    const count = snapshot.data().count

    const data = {
      invoices: sortedInvoices,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
      count,
    }

    return data
  } catch (error) {
    throw new Error(`Error getting invoices at searchInvoices route: ${error}`)
  }
}
