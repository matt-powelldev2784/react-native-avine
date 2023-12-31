import { doc, collection, getDocs, query } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundNoJobsT } from '../../types/RoundT'

export const getRoundsFromDb = async (): Promise<RoundNoJobsT[]> => {
  if (auth.currentUser === null) {
    return []
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundsCollection = collection(userDoc, 'rounds')
    const roundsQuery = query(roundsCollection)
    const roundsSnapshot = await getDocs(roundsQuery)

    const roundsData: RoundNoJobsT[] = roundsSnapshot.docs.map((round) => ({
      id: round.id,
      roundName: round.data().roundName,
      location: round.data().location,
      frequency: round.data().frequency,
    }))

    roundsData.sort((a, b) => a.roundName.localeCompare(b.roundName))

    console.log('Rounds retrieved:', roundsData)
    return roundsData
  } catch (error) {
    console.error('An error occurred:', error)
    throw new Error('An error occurred while retrieving rounds.')
  }
}
