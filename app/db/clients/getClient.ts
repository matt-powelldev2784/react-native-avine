import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { ClientWithIdT } from '../../types/ClientT'

export const getClient = async (clientId: string): Promise<ClientWithIdT> => {
  if (auth.currentUser === null) {
    return authError({ filename: 'getClient' })
  }

try {
  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const clientDocRef = doc(userDoc, 'clients', clientId)

  const clientDoc = await getDoc(clientDocRef)
  const clientData = clientDoc.data() as ClientWithIdT

  return { ...clientData, id: clientData.id }
} catch (error) {
  throw new Error(`Error getting client at getClient route: ${error}`)
}
}
