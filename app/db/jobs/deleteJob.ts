import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const deleteJob = async (jobId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'deleteJob' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const jobDocRef = doc(userDoc, 'jobs', jobId)

    await updateDoc(jobDocRef, { isDeleted: true })

    return { message: `Job with id ${jobId} deleted`, isDeleted: true }
  } catch (error) {
    throw new Error(`Error deleteting job from db at deleteJob route: ${error}`)
  }
}
