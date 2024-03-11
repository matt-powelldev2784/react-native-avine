import { doc, collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { ClientWithIdT } from '../../types/ClientT'

export const getAllClients = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'getAllClients' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const clientsCollection = collection(userDoc, 'clients')

    const q = query(clientsCollection, where('isDeleted', '!=', true))
    const querySnapshot = await getDocs(q)

    const clients = querySnapshot.docs.map((client) => ({
      id: client.id,
      ...client.data(),
    })) as ClientWithIdT[]

    const sortedClients = clients.sort((a, b) => a.name.localeCompare(b.name))

    return sortedClients
  } catch (error) {
    throw new Error(`Error getting user jobs at getAllClients route: ${error}`)
  }
}
