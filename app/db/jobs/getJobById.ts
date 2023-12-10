import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobWithIdT } from '../../types/JobT'

export const getJobById = async (jobId: string): Promise<JobWithIdT | null> => {
  if (auth.currentUser === null) {
    console.log('No user signed in')
    return null
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const jobDocRef = doc(userDoc, 'jobs', jobId)

  try {
    const jobDoc = await getDoc(jobDocRef)
    if (jobDoc.exists()) {
      const jobData = jobDoc.data() as JobWithIdT
      console.log('Job data:', jobData)
      return jobData
    } else {
      console.log('No such job found')
      return null
    }
  } catch (error) {
    console.error('Error getting job data:', error)
    return null
  }
}
