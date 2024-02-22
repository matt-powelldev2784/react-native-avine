import { doc, arrayRemove, runTransaction } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'

interface deleteOneOffRoundT {
  date: string
  roundId: string
}

export const deleteSingleRecurringRound = async ({
  date,
  roundId,
}: deleteOneOffRoundT) => {
  try {
    await runTransaction(db, async (transaction) => {
      if (auth.currentUser === null) {
        return
      }
      // get planner document
      const plannerDocRef = doc(
        db,
        'users',
        auth.currentUser.uid,
        'planner',
        date,
      )
      const plannerDoc = await transaction.get(plannerDocRef)
      if (!plannerDoc.exists()) {
        throw Error('Planner document does not exist')
      }

      // get round document
      const roundDocRef = doc(
        db,
        'users',
        auth.currentUser.uid,
        'rounds',
        roundId,
      )
      const roundDoc = await transaction.get(roundDocRef)
      if (!roundDoc.exists()) {
        throw Error('Round document does not exist')
      }
      const roundDocData = roundDoc.data()
      const relatedJobs = roundDocData?.relatedJobs || []

      // get recurring round document
      const recurringRoundDocRef = doc(
        db,
        'users',
        auth.currentUser.uid,
        'recurringRoundData',
        roundId,
      )
      const recurringRoundDoc = await transaction.get(recurringRoundDocRef)
      if (!recurringRoundDoc) {
        throw Error('Recurring round document does not exist')
      }
      const recurringRoundData = recurringRoundDoc.data()
      const recurringDates = recurringRoundData?.recurringDates || []

      // remove round from planner document
      transaction.update(plannerDocRef, {
        recurringRounds: arrayRemove(`${roundId}@recurringRound`),
      })

      // remove each related job from planner document
      relatedJobs.forEach(async (jobId: string) => {
        transaction.update(plannerDocRef, {
          relatedJobs: arrayRemove(`${roundId}@${jobId}@recurringRound`),
        })
      })

      //remove planner date from recurring round document
      transaction.update(recurringRoundDocRef, {
        recurringDates: recurringDates.filter(
          (recurringDate: string) => recurringDate !== date,
        ),
      })

      console.log(
        `Scheduled round om ${date} with round id ${roundId} removed from db`,
      )
    })
  } catch (error) {
    console.error(`Error removing round ${roundId} from db`, error)
  }
}
