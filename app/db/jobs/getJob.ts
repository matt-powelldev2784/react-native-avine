import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobWithIdT } from '../../types/JobT'
import { authError } from '../authError'

export const getJob = async (jobId: string): Promise<JobWithIdT | null> => {
  if (auth.currentUser === null) {
    return authError({ filename: 'getJob' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const jobDocRef = doc(userDoc, 'jobs', jobId)

    const jobDoc = await getDoc(jobDocRef)
    const jobData = jobDoc.data() as JobWithIdT

    return { ...jobData, id: jobDoc.id }
  } catch (error) {
    console.error('Error getting job at getJob route', error)
    throw error
  }
}
