import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { JobWithIdT } from '../../types/JobT'

export const getJob = async (jobId: string): Promise<JobWithIdT> => {
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
    throw new Error(`Error getting job at getJob route: ${error}`)
  }
}
