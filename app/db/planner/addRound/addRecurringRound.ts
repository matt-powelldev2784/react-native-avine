import {
  doc,
  arrayUnion,
  arrayRemove,
  runTransaction,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getRoundById } from '../../rounds/getRoundById'

interface addRecurringRoundT {
  roundId: string
  recurringDates: string[]
  recurringRound: boolean
}

//add recurring round to planner collection
export const addRecurringRound = async ({
  recurringRound,
  roundId,
  recurringDates,
}: addRecurringRoundT) => {
  if (auth.currentUser === null) {
    return
  }

  console.log(recurringRound, roundId, recurringDates)

  try {
    await runTransaction(db, async (transaction) => {
      for (const date of recurringDates) {
        if (auth.currentUser === null) {
          return
        }

        const plannerDocRef = doc(
          db,
          'users',
          auth.currentUser.uid,
          'planner',
          date,
        )
        const plannerDoc = await getDoc(plannerDocRef)

        if (!plannerDoc.exists()) {
          await setDoc(plannerDocRef, {
            oneOffRounds: [],
            relatedJobs: [],
            completedJobs: [],
            recurringRounds: [],
          })
        }

        if (recurringRound) {
          transaction.update(plannerDocRef, {
            recurringRounds: arrayUnion(roundId),
            oneOffRounds: arrayRemove(roundId),
          })
        }

        //add each related to job to planner document
        const round = await getRoundById(roundId)
        const relatedJobs = round?.relatedJobs || []

        relatedJobs.forEach((jobId) => {
          transaction.update(plannerDocRef, {
            relatedJobs: arrayUnion(`${roundId}/${jobId}`),
          })
        })
      }
    })

    const recurringRoundDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'recurringRoundData',
      roundId,
    )
    const recurringRoundDoc = await getDoc(recurringRoundDocRef)
    const recurringRoundData = recurringRoundDoc.data()

    return recurringRoundData
  } catch (error) {
    console.error(error)
    throw error
  }
}
