import { collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobWithIdT } from '../../types/JobT'

export const queryJobsForSpecificRound = async (roundId: string) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const jobsRef = collection(db, 'users', auth.currentUser.uid, 'jobs')
    const q = query(jobsRef, where('linkedRounds', 'array-contains', roundId))

    const querySnapshot = await getDocs(q)

    const jobs: JobWithIdT[] = []
    querySnapshot.forEach((job) => {
      const jobWithId = { ...job.data(), id: job.id }
      jobs.push(jobWithId as JobWithIdT)
    })

    console.log('Rounds related to specific round:', jobs)
    return jobs
  } catch (error) {
    console.error('Error querying rounds:', error)
  }
}
