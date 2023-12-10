import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundDbT } from '../../../types/RoundT'

export const getRoundById = async (
  roundId: string,
): Promise<RoundDbT | null> => {
  if (auth.currentUser === null) {
    console.log('No user signed in')
    return null
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const roundDocRef = doc(userDoc, 'rounds', roundId)

  try {
    const roundDoc = await getDoc(roundDocRef)
    if (roundDoc.exists()) {
      const roundData = roundDoc.data() as RoundDbT
      console.log('Round data:', roundData)
      return roundData
    } else {
      console.log('No such round found')
      return null
    }
  } catch (error) {
    console.error('Error getting round data:', error)
    return null
  }
}