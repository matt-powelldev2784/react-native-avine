import { authError } from './../../../authError'
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
} from 'firebase/firestore'
import { db, auth } from '../../../../../firebaseConfig'

export const removeRelatedRoundsIdFromDb = async (roundId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'removeRelatedRoundsIdFromDb' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const plannerCollection = collection(userDoc, 'planner')

    await runTransaction(db, async (transaction) => {
      // remove round id from all planner one off job arrays
      const oneOffRoundfQuery = query(
        plannerCollection,
        where('oneOffRounds', 'array-contains', `${roundId}@oneOffRound`),
      )

      const oneOffRoundQuerySnapshot = await getDocs(oneOffRoundfQuery)

      const oneOffRoundPromises = oneOffRoundQuerySnapshot.docs.map(
        async (plannerDoc) => {
          if (!auth.currentUser) {
            return authError({ filename: 'removeRelatedRoundsIdFromDb' })
          }

          const plannerDocRef = doc(
            db,
            'users',
            auth.currentUser.uid,
            'planner',
            plannerDoc.id,
          )
          const plannerDocData = await transaction.get(plannerDocRef)

          if (!plannerDocData.exists()) {
            throw new Error(
              'plannerDoc does not exist at removeRelatedRoundsIdFromDb route',
            )
          }

          

          transaction.update(plannerDocRef, {
            oneOffRounds: arrayRemove(`${roundId}@oneOffRound`),
          })
        },
      )

      // remove round id from all planner recurring job arrays
      const recurringRoundfQuery = query(
        plannerCollection,
        where('recurringRounds', 'array-contains', `${roundId}@recurringRound`),
      )

      const recurringRoundQuerySnapshot = await getDocs(recurringRoundfQuery)

      const recurringfRoundPromises = recurringRoundQuerySnapshot.docs.map(
        async (plannerDoc) => {
          if (!auth.currentUser) {
            return authError({ filename: 'removeRelatedRoundsIdFromDb' })
          }

          const plannerDocRef = doc(
            db,
            'users',
            auth.currentUser.uid,
            'planner',
            plannerDoc.id,
          )
          const plannerDocData = await transaction.get(plannerDocRef)

          if (!plannerDocData.exists()) {
            throw new Error(
              'plannerDoc does not exist at removeRelatedRoundsIdFromDb route',
            )
          }

          transaction.update(plannerDocRef, {
            recurringRounds: arrayRemove(`${roundId}@recurringRound`),
          })
        },
      )

      await Promise.all(oneOffRoundPromises)
      await Promise.all(recurringfRoundPromises)
    })

    return {
      message: `Round with id ${roundId} removed from all planner docs`,
      isDeleted: true,
    }
  } catch (error) {
    throw new Error(
      `Error deleteting round from db at removeRelatedRoundsIdFromDb route: ${error}`,
    )
  }
}
