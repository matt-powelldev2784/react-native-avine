import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../utils/authError'

export const getRoundById = async (roundId: string) => {
  if (auth.currentUser === null) {
    return authError()
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundDocRef = doc(userDoc, 'rounds', roundId)

    const roundDoc = await getDoc(roundDocRef)
    if (!roundDoc.exists()) {
      throw new Error('No such round found')
    }

    const rounData = {
      ...roundDoc.data(),
      id: roundDoc.id,
    }

    return {
      success: true,
      status: 200,
      message: 'Round and related job data retrieved',
      data: {
        round: { ...rounData },
      },
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: 'An error occurred while gettiing round and related job data',
    }
  }
}
