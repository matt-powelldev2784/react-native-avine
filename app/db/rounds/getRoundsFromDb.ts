import { doc, collection, getDocs, query } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { getUserJobsFromDb } from '../jobs/getUserJobsFromDb'
import { RoundWithJobT } from '../../../types/RoundT'

export const getRoundsAndJobsFromDb = async (): Promise<RoundWithJobT[]> => {
  if (auth.currentUser === null) {
    return []
  }

  try {
    const jobData = await getUserJobsFromDb()

    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundsCollection = collection(userDoc, 'rounds')
    const roundsQuery = query(roundsCollection)
    const roundsSnapshot = await getDocs(roundsQuery)

    const roundsData: RoundWithJobT[] = roundsSnapshot.docs.map((round) => ({
      id: round.id,
      roundName: round.data().roundName,
      location: round.data().location,
      frequency: round.data().frequency,
      jobs: jobData?.filter((job) => job.linkedRounds.includes(round.id)),
    }))

    roundsData.sort((a, b) => a.roundName.localeCompare(b.roundName))

    console.log('Rounds retrieved:', roundsData)
    return roundsData
  } catch (error) {
    console.error('An error occurred:', error)
    throw new Error('An error occurred while retrieving rounds.')
  }
}
