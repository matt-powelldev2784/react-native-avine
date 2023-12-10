import { doc, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

export const deleteRoundById = async (roundId: string) => {
  if (auth.currentUser === null) {
    console.log('No user signed in')
    return null
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const roundDocRef = doc(userDoc, 'rounds', roundId)

  try {
    await deleteDoc(roundDocRef)
    console.log('Round deleted successfully')
    return true
  } catch (error) {
    console.error('Error deleting Round:', error)
    return false
  }
}
