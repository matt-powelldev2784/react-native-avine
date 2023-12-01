import { doc, collection, getDocs, query } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

export const getUserJobsFromDb = async () => {
  if (auth.currentUser === null) {
    return
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const jobsCollection = collection(userDoc, 'jobs')
  const q = query(jobsCollection)

  const querySnapshot = await getDocs(q)
  let jobs = querySnapshot.docs.map((job) => job.data())
  jobs = jobs.sort((a, b) => a.jobName.localeCompare(b.jobName))

  console.log('User jobs:', jobs)
  return jobs
}
