import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { ClientT } from '../../types/ClientT'
import { authError } from '../authError'

export const addClient = async (clientInfo: ClientT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'addClient' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)

    const clientsCollection = collection(userDoc, 'clients')
    const clientDoc = doc(clientsCollection)

    await setDoc(clientDoc, { ...clientInfo, isDeleted: false })
    const client = await getDoc(clientDoc)

    return { id: client.id, ...client.data() }
  } catch (error) {
    throw new Error(`Error adding cleint to db at addClient route: ${error}`)
  }
}
