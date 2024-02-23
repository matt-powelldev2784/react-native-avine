import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundWithIdT } from '../../types/RoundT'
import { authError } from '../authError'

export const getRound = async (roundId: string): Promise<RoundWithIdT> => {
  if (!auth.currentUser) {
    return authError({ filename: 'getRound' })
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const roundDocRef = doc(userDoc, 'rounds', roundId)

  try {
    const roundDoc = await getDoc(roundDocRef)

    if (!roundDoc.exists()) {
      throw new Error(`No round found with id: ${roundId}`)
    }

    const roundData: RoundWithIdT = {
      id: roundDoc.id,
      frequency: roundDoc.data().frequency,
      isDeleted: roundDoc.data().isDeleted,
      location: roundDoc.data().location,
      relatedJobs: roundDoc.data().relatedJobs,
      roundName: roundDoc.data().roundName,
    }

    return roundData
  } catch (error) {
    throw new Error(`Error getting round at getRound route: ${error}`)
  }
}
