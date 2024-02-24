import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobT } from '../../types/JobT'
import { authError } from '../authError'

interface UpdateJob extends JobT {
  [key: string]: any
}

interface UpdateJobInDbT {
  jobId: string
  jobData: UpdateJob
}

export const updateJob = async ({ jobId, jobData }: UpdateJobInDbT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'toggleJobIsComplete' })
  }

  try {
    const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)

    await updateDoc(jobDocRef, jobData)

    const updatedJob = await getDoc(jobDocRef)
    const updatedJobData = { id: updatedJob.id, ...updatedJob.data() }

    return updatedJobData
  } catch (error) {
    throw new Error(`Error updating job detail at updateJob route: ${error}`)
  }
}
