import {
  doc,
  arrayUnion,
  runTransaction,
  setDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getRound } from '../../rounds/getRound'

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

  try {
    await runTransaction(db, async (transaction) => {
      for (const date of recurringDates) {
        if (auth.currentUser === null) {
          return
        }

        const day: string = date.slice(0, 2)
        const month: string = date.slice(2, 4)
        const year: string = date.slice(4)
        const dateObject = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
        )
        const dateTimestamp = Timestamp.fromDate(dateObject)

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
            _date: date,
            _day: day,
            _month: month,
            _year: year,
            _dateTimestamp: dateTimestamp,
          })
        }

          if (recurringRound) {
            transaction.update(plannerDocRef, {
              recurringRounds: arrayUnion(`${roundId}@recurringRound`),
              _date: date,
              _day: day,
              _month: month,
              _year: year,
              _dateTimestamp: dateTimestamp,
            })
          }

        //add each related to job to planner document
        const round = await getRound(roundId)
        const relatedJobs = round?.relatedJobs || []

        relatedJobs.forEach((jobId) => {
          transaction.update(plannerDocRef, {
            relatedJobs: arrayUnion(`${roundId}@${jobId}@recurringRound`),
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
