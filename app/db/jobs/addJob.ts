import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobT } from '../../types/JobT'
import { authError } from '../authError'

export const addJob = async (jobData: JobT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'addJobToDb' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)

    const jobsCollection = collection(userDoc, 'jobs')
    const jobDoc = doc(jobsCollection)

    await setDoc(jobDoc, { ...jobData, isDeleted: false })
    const job = await getDoc(jobDoc)

    return { id: job.id, ...job.data() }
  } catch (error) {
    throw new Error(`Error adding job to db at addJob route: ${error}`)
  }
}
