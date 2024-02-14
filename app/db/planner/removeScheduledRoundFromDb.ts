import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  arrayRemove,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

interface RemoveScheduledRoundFromDb {
  date: string
  roundId: string
  recurringRound: boolean
}

export const removeScheduledRoundFromoDb = async ({
  date,
  roundId,
  recurringRound,
}: RemoveScheduledRoundFromDb) => {
  if (auth.currentUser === null) {
    return
  }

  const plannerDocRef = doc(db, 'users', auth.currentUser.uid, 'planner', date)

  try {
    //remove scheduled round from planner document
    const plannerDoc = await getDoc(plannerDocRef)

    if (!plannerDoc.exists()) {
      throw 'Document does not exist!'
    }

    if (!recurringRound) {
      await updateDoc(plannerDocRef, {
        relatedRounds: arrayRemove(roundId),
      })
    }

    if (recurringRound) {
      await updateDoc(plannerDocRef, {
        recurringRounds: arrayRemove(roundId),
      })
    }

    //remove each related job from planner document
    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'jobs'),
      where('linkedRounds', 'array-contains', roundId),
    )

    const querySnapshot = await getDocs(q)

    await Promise.all(
      querySnapshot.docs.map(async (job) => {
        if (auth.currentUser === null) {
          return
        }

        const jobData = job.data()

        const rounds = plannerDoc.data()?.relatedRounds

        //only remove job from planner if it is not linked to any other rounds
        rounds.map(async (round: string) => {
          if (jobData.linkedRounds.includes(round)) {
            return
          } else {
            await updateDoc(plannerDocRef, {
              relatedJobs: arrayRemove(job.id),
              completedJobs: arrayRemove(job.id),
            })
          }
        })
      }),
    )

    console.log(`Sheduled round ${roundId} removed from db`)
  } catch (error) {
    console.error(`Error removing round ${roundId} from db`, error)
  }
}
