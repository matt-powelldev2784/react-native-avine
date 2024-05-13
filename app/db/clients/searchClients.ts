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
import { ClientWithIdT } from '../../types/ClientT'
import { DocumentSnapshot } from 'firebase/firestore'

interface SearchClientsT {
  searchField: string
  searchTerm: string
  lastVisible: DocumentSnapshot | null
}

export const searchClients = async ({
  searchField,
  searchTerm,
  lastVisible = null,
}: SearchClientsT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'searchClients' })
  }

  console.log('searchTerm', searchTerm)
  console.log('searchField', searchField)

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const clientsCollection = collection(userDoc, 'clients')

    //get clients data
    let q
    if (lastVisible) {
      q = query(
        clientsCollection,
        where(searchField, '==', searchTerm),
        where('isDeleted', '!=', true),
        orderBy('name'),
        startAfter(lastVisible),
        limit(10),
      )
    } else {
      q = query(
        clientsCollection,
        where(searchField, '==', searchTerm),
        where('isDeleted', '!=', true),
        orderBy('name'),
        limit(10),
      )
    }

    const querySnapshot = await getDocs(q)

    const clients = querySnapshot.docs.map((client) => ({
      id: client.id,
      ...client.data(),
    })) as ClientWithIdT[]

    const sortedClients = clients.sort((a, b) => a.name.localeCompare(b.name))

    // get document count
    const countQuery = query(
      clientsCollection,
      where(searchField, '==', searchTerm),
      where('isDeleted', '!=', true),
      orderBy('name'),
    )
    const snapshot = await getCountFromServer(countQuery)
    const count = snapshot.data().count

    const data = {
      clients: sortedClients,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
      count,
    }

    return data
  } catch (error) {
    throw new Error(`Error getting clients at searchClients route: ${error}`)
  }
}
