import {
  doc,
  query,
  where,
  collection,
  getDocs,
  runTransaction,
  arrayRemove,
} from 'firebase/firestore'
import { db, auth } from '../../../../../firebaseConfig'
import { authError } from './../../../authError'

export const removeRelatedJobIdFromAllRounds = async (jobId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'removeRelatedJobIdFromAllRounds' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundsCollection = collection(userDoc, 'rounds')

    const q = query(
      roundsCollection,
      where('relatedJobs', 'array-contains', jobId),
    )

    const querySnapshot = await getDocs(q)

    await runTransaction(db, async (transaction) => {
      const updatePromises = querySnapshot.docs.map(async (round) => {
        if (!auth.currentUser) {
          return authError({ filename: 'removeRelatedJobIdFromAllRounds' })
        }

        const roundDocRef = doc(
          db,
          'users',
          auth.currentUser.uid,
          'rounds',
          round.id,
        )
        const roundDoc = await transaction.get(roundDocRef)

        if (!roundDoc.exists()) {
          throw new Error(
            'roundDoc does not exist at removeRelatedJobIdFromAllRounds route',
          )
        }

        transaction.update(roundDocRef, { relatedJobs: arrayRemove(jobId) })
      })

      await Promise.all(updatePromises)
    })
  return {
    message: `Job with id ${jobId} removed from all rounds relatedJobs arrays`,
    relatedJobIdsDeleted: true,
  }
  } catch (error) {
    throw new Error(
      `Error deleting all related job ids from all rounds at removeRelatedJobIdFromAllRounds route: ${error}`,
    )
  }
}
