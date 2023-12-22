import { collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundNoJobsT } from '../../types/RoundT'

export const queryRoundsOnDate = async (date: string) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const roundsRef = collection(db, 'users', auth.currentUser.uid, 'rounds')
    const q = query(roundsRef, where('scheduledDates', 'array-contains', date))

    const querySnapshot = await getDocs(q)

    const rounds: RoundNoJobsT[] = []
    querySnapshot.forEach((doc) => {
      rounds.push(doc.data() as RoundNoJobsT)
    })

    console.log('Rounds on date:', rounds)
    return rounds
  } catch (error) {
    console.error('Error querying rounds:', error)
  }
}
