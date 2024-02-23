import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundWithIdT } from '../../types/RoundT'
import { authError } from '../authError'

export const getRound = async (roundId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getRound' })
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const roundDocRef = doc(userDoc, 'rounds', roundId)

  try {
    const roundDoc = await getDoc(roundDocRef)

    const roundData = {
      id: roundDoc.id,
      ...roundDoc.data(),
    } as RoundWithIdT

    return roundData
  } catch (error) {
     throw new Error(`Error getting round at getRound route: ${error}`)
  }
}
