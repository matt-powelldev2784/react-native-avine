import { authError } from './../../authError'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { removeRelatedJobIdFromAllRounds } from './removeRelatedJobIdFromAllRounds/removeRelatedJobIdFromAllRounds'

export const handleDeleteJob = async (jobId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'handleDeleteJob' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const jobDocRef = doc(userDoc, 'jobs', jobId)

    await removeRelatedJobIdFromAllRounds(jobId)

    await updateDoc(jobDocRef, { isDeleted: true })

    return { message: `Job with id ${jobId} deleted`, isDeleted: true }
  } catch (error) {
    throw new Error(
      `Error deleteting job from db at handleDeleteJob route: ${error}`,
    )
  }
}
