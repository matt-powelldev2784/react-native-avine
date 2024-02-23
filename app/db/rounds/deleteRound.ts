import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const deleteRound = async (roundId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'deleteRound' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundDocRef = doc(userDoc, 'rounds', roundId)

    await updateDoc(roundDocRef, { isDeleted: true })

    return { message: `Round with id ${roundId} deleted`, isDeleted: true }
  } catch (error) {
    throw new Error(
      `Error deleteting round from db at deleteRound route: ${error}`,
    )
  }
}
