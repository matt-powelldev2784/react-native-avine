import { collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundNoJobsT, RoundWithRelatedJobsT } from '../../types/RoundT'
import { queryJobsForSpecificRound } from '../jobs/queryJobsForSpecificRound'

export const queryRoundsOnDate = async (date: string) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const roundsRef = collection(db, 'users', auth.currentUser.uid, 'rounds')
    const q = query(roundsRef, where('scheduledDates', 'array-contains', date))

    const querySnapshot = await getDocs(q)

    const rounds: RoundWithRelatedJobsT[] = []
    for (const doc of querySnapshot.docs) {
      const round = doc.data() as RoundNoJobsT
      const relatedJobs = await queryJobsForSpecificRound(doc.id)
      const roundWithRelatedJobs = { ...round, relatedJobs, id: doc.id }
      rounds.push(roundWithRelatedJobs)
    }

    console.log('Rounds with job details on date:', rounds)
    return rounds
  } catch (error) {
    console.error('Error querying rounds:', error)
  }
}
