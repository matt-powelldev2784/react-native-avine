import { doc, collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundWithRelatedJobIdsT } from '../../types/RoundT'
import { authError } from '../authError'

export const getAllRounds = async (): Promise<RoundWithRelatedJobIdsT[]> => {
  if (!auth.currentUser) {
    return authError({ filename: 'getAllRounds' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundsCollection = collection(userDoc, 'rounds')

    const q = query(roundsCollection, where('isDeleted', '!=', true))
    const querySnapshot = await getDocs(q)

    const roundsData: RoundWithRelatedJobIdsT[] = querySnapshot.docs.map(
      (round) => ({
        id: round.id,
        roundName: round.data().roundName,
        location: round.data().location,
        frequency: round.data().frequency,
        isDeleted: round.data().isDeleted,
        relatedJobs: round.data().relatedJobs,
      }),
    )

    const sortedRounds = roundsData.sort((a, b) =>
      a.roundName.localeCompare(b.roundName),
    )

    return sortedRounds
  } catch (error) {
    throw new Error(`Error getting user rounds at getAllRounds route: ${error}`)
  }
}
