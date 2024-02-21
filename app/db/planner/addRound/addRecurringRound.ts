import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
} from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getRoundById } from '../../rounds/getRoundById'

interface addRecurringRoundT {
  roundId: string
  date: string
  recurringRound: boolean
}

//add recurring round to planner collection
export const addRecurringRound = async ({
  recurringRound,
  roundId,
  date,
}: addRecurringRoundT) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    //add recurring round to planner collection
    const plannerDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'planner',
      date,
    )

    if (recurringRound) {
      await updateDoc(plannerDocRef, {
        recurringRounds: arrayUnion(roundId),
        oneOffRounds: arrayRemove(roundId),
      })
    }

    //add each related to job to planner document
    const round = await getRoundById(roundId)
    const relatedJobs = round?.relatedJobs || []

    await Promise.all(
      relatedJobs.map(async (jobId) => {
        if (auth.currentUser === null) {
          return
        }

        await updateDoc(plannerDocRef, {
          relatedJobs: arrayUnion(`${roundId}/${jobId}`),
        })
      }),
    )

    const plannerDoc = await getDoc(plannerDocRef)

    return plannerDoc
  } catch (error) {
    return { error }
  }
}
