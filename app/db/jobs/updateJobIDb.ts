import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobT } from '../../types/JobT'

interface UpdateJob extends JobT {
  [key: string]: any
}

interface UpdateJobInDb {
  jobId: string
  jobData: UpdateJob
}

export const updateJobInDb = async ({ jobId, jobData }: UpdateJobInDb) => {
  if (auth.currentUser === null) {
    console.error('No user signed in')
    return
  }

  console.log('jobId', jobId)
  console.log('jobData', jobData)

  const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)

  try {
    await updateDoc(jobDocRef, jobData)
    console.log('Job updated with ID:', jobId)
  } catch (error) {
    console.error('Error updating job:', error)
  }
}
