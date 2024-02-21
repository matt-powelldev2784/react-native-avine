import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  arrayRemove,
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

  const plannerDocRef = doc(db, 'users', auth.currentUser.uid, 'planner', date)

  try {
    //add one off round to planner document
    let plannerDoc = await getDoc(plannerDocRef)

    if (!plannerDoc.exists()) {
      await setDoc(plannerDocRef, {
        oneOffRounds: [],
        relatedJobs: [],
        completedJobs: [],
        recurringRounds: [],
      })
      plannerDoc = await getDoc(plannerDocRef)
    }

    if (!plannerDoc.exists()) {
      throw Error('Error creating planner doc')
    }

    if (!recurringRound) {
      await updateDoc(plannerDocRef, {
        oneOffRounds: arrayUnion(roundId),
        recurringRounds: arrayRemove(roundId),
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

    return plannerDoc
  } catch (error) {
    return { error }
  }
}
