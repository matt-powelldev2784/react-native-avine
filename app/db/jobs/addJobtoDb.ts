import { doc, setDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

export const addJobToDb = async (jobData) => {
  if (auth.currentUser === null) {
    return
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)

  const jobsCollection = collection(userDoc, 'jobs')
  const jobDoc = doc(jobsCollection)

  await setDoc(jobDoc, jobData)

  console.log('New job added with ID:', jobDoc.id)
}
