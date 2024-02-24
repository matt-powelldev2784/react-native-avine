import { doc, collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobWithIdT } from '../../types/JobT'
import { authError } from '../authError'

export const getAllJobs = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'getAllJobs' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const jobsCollection = collection(userDoc, 'jobs')

    const q = query(jobsCollection, where('isDeleted', '!=', true))
    const querySnapshot = await getDocs(q)

    const jobs = querySnapshot.docs.map((job) => ({
      id: job.id,
      ...job.data(),
    })) as JobWithIdT[]

    const sortedJobs = jobs.sort((a, b) => a.jobName.localeCompare(b.jobName))

    return sortedJobs
  } catch (error) {
    throw new Error(`Error getting user jobs at getAllJobs route: ${error}`)
  }
}
