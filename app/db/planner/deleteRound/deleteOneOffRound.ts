import { doc, updateDoc, getDoc, arrayRemove } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'

interface deleteOneOffRoundT {
  date: string
  roundId: string
}

export const deleteOneOffRound = async ({
  date,
  roundId,
}: deleteOneOffRoundT) => {
  if (auth.currentUser === null) {
    return
  }

  const plannerDocRef = doc(db, 'users', auth.currentUser.uid, 'planner', date)

  try {
    //remove scheduled round from planner document
    const plannerDoc = await getDoc(plannerDocRef)
    console.log('plannerDoc', plannerDoc.data())

    if (!plannerDoc.exists()) {
      throw Error('Planner document does not exist')
    }

    await updateDoc(plannerDocRef, {
      oneOffRounds: arrayRemove(`${roundId}@oneOffRound`),
    })

    //remove each related job from planner document
    const roundDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'rounds',
      roundId,
    )
    const roundDoc = await getDoc(roundDocRef)
    const roundDocData = roundDoc.data()
    const relatedJobs = roundDocData?.relatedJobs || []

    await Promise.all(
      relatedJobs.map(async (jobId: string) => {
        if (auth.currentUser === null) {
          return
        }

        await updateDoc(plannerDocRef, {
          relatedJobs: arrayRemove(`${roundId}@${jobId}`),
        })
      }),
    )

    console.log(`Scheduled round with round id ${roundId} removed from db`)
  } catch (error) {
    console.error(`Error removing round ${roundId} from db`, error)
  }
}
