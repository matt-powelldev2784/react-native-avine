import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

export const deleteJobById = async (jobId: string) => {
  if (auth.currentUser === null) {
    console.log('No user signed in')
    return null
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const jobDocRef = doc(userDoc, 'jobs', jobId)

  try {
    await updateDoc(jobDocRef, { deleted: true })
    console.log('Job deleted successfully')
    return true
  } catch (error) {
    console.error('Error deleting job:', error)
    return false
  }
}
