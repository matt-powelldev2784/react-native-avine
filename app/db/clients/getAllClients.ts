import {
  doc,
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  orderBy,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { ClientWithIdT } from '../../types/ClientT'
import { DocumentSnapshot } from 'firebase/firestore'

export const getAllClients = async (
  lastVisible: DocumentSnapshot | null = null,
) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getAllClients' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const clientsCollection = collection(userDoc, 'clients')

    let q
    if (lastVisible) {
      q = query(
        clientsCollection,
        where('isDeleted', '!=', true),
        orderBy('name'),
        startAfter(lastVisible),
        limit(10),
      )
    } else {
      q = query(
        clientsCollection,
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

    const data = {
      clients: sortedClients,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    }

    return data
  } catch (error) {
    throw new Error(`Error getting user jobs at getAllClients route: ${error}`)
  }
}
