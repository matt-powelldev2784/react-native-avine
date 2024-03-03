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
import { authError } from '../../../authError'

export const removeRelatedJobIdsFromDb = async (jobId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'removeRelatedJobIdsFromDb' })
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
      // remove job id from all rounds relatedJobs arrays
      const roundsPromises = querySnapshot.docs.map(async (round) => {
        if (!auth.currentUser) {
          return authError({ filename: 'removeRelatedJobIdsFromDb' })
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
            'roundDoc does not exist at removeRelatedJobIdsFromDb route',
          )
        }

        transaction.update(roundDocRef, { relatedJobs: arrayRemove(jobId) })
      })

      //get al rounds with relatedJobs array containing jobId
      const roundsRelatedToJobId = querySnapshot.docs.map((round) => round.id)

      // remove job id from planner docs for all one off rounds
      const oneOffPlannerPromises = roundsRelatedToJobId.map(
        async (roundId) => {
          if (!auth.currentUser) {
            return authError({ filename: 'removeRelatedJobIdsFromDb' })
          }

          const plannerCollection = collection(userDoc, 'planner')

          const q = query(
            plannerCollection,
            where(
              'relatedJobs',
              'array-contains',
              `${roundId}@${jobId}@oneOffRound`,
            ),
          )

          const querySnapshot = await getDocs(q)

          querySnapshot.docs.map(async (plannerDoc) => {
            if (!auth.currentUser) {
              return authError({ filename: 'removeRelatedJobIdsFromDb' })
            }

            const plannerDocRef = doc(
              db,
              'users',
              auth.currentUser.uid,
              'planner',
              plannerDoc.id,
            )

            transaction.update(plannerDocRef, {
              relatedJobs: arrayRemove(`${roundId}@${jobId}@oneOffRound`),
            })
          })
        },
      )

      // remove job id from planner docs for all recurring rounds
      const recurringPlannerPromises = roundsRelatedToJobId.map(
        async (roundId) => {
          if (!auth.currentUser) {
            return authError({ filename: 'removeRelatedJobIdsFromDb' })
          }

          const plannerCollection = collection(userDoc, 'planner')

          const q = query(
            plannerCollection,
            where(
              'relatedJobs',
              'array-contains',
              `${roundId}@${jobId}@recurringRound`,
            ),
          )

          const querySnapshot = await getDocs(q)

          querySnapshot.docs.map(async (plannerDoc) => {
            if (!auth.currentUser) {
              return authError({ filename: 'removeRelatedJobIdsFromDb' })
            }

            const plannerDocRef = doc(
              db,
              'users',
              auth.currentUser.uid,
              'planner',
              plannerDoc.id,
            )

            transaction.update(plannerDocRef, {
              relatedJobs: arrayRemove(`${roundId}@${jobId}@recurringRound`),
            })
          })
        },
      )

      await Promise.all(roundsPromises)
      await Promise.all(oneOffPlannerPromises)
      await Promise.all(recurringPlannerPromises)
    })

    // return success message
    return {
      message: `Job with id ${jobId} removed from all round relatedJobs arrays and planner relatedJobs arrays`,
      relatedJobIdsDeleted: true,
    }
  } catch (error) {
    throw new Error(
      `Error deleting all related job ids from all rounds at removeRelatedJobIdsFromDb route: ${error}`,
    )
  }
}
