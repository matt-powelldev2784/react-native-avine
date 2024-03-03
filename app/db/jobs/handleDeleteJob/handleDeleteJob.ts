import { authError } from './../../authError'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { removeRelatedJobIdsFromDb } from './removeRelatedJobIdFromDb/removeRelatedJobIdsFromDb'

export const handleDeleteJob = async (jobId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'handleDeleteJob' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const jobDocRef = doc(userDoc, 'jobs', jobId)

    const removedJobIdsIsSuccess = await removeRelatedJobIdsFromDb(jobId)

    if (removedJobIdsIsSuccess.relatedJobIdsDeleted) {
      await updateDoc(jobDocRef, { isDeleted: true })
    }

    return { message: `Job with id ${jobId} deleted`, isDeleted: true }
  } catch (error) {
    throw new Error(
      `Error deleteting job from db at handleDeleteJob route: ${error}`,
    )
  }
}
