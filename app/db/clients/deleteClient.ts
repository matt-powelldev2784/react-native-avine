import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const deleteClient = async (clientId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'deleteClient' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const clientDocRef = doc(userDoc, 'client', clientId)

    await updateDoc(clientDocRef, { isDeleted: true })

    return { message: `Client with id ${clientId} deleted`, isDeleted: true }
  } catch (error) {
    throw new Error(
      `Error deleteting client from db at deleteClient route: ${error}`,
    )
  }
}
