import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getRoundById } from '../../rounds/getRoundById'

interface addOneOffRoundT {
  roundId: string
  date: string
  recurringRound: boolean
}

//add one off round to planner collection
export const addOneOffRound = async ({
  recurringRound,
  roundId,
  date,
}: addOneOffRoundT) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    //add one off round to planner document
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

    if (!recurringRound) {
      await updateDoc(plannerDocRef, {
        oneOffRounds: arrayUnion(`${roundId}@oneOffRound`),
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
          relatedJobs: arrayUnion(`${roundId}@${jobId}@oneOffRound`),
        })
      }),
    )

    const updatedPlannerDoc = await getDoc(plannerDocRef)
    const updatedPlannerData = updatedPlannerDoc.data()

    return updatedPlannerData
  } catch (error) {
    return { error }
  }
}
