import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { removeScheduledRoundFromoDb } from './removeScheduledRoundFromDb'

interface removeRecurringRoundFromDb {
  date: string
  roundId: string
  singleEntry: boolean
  recurringEntry: boolean
  removeAllRecurringRounds?: boolean
}

export const removeScheduledRoundsFromDb = async ({
  date,
  roundId,
  singleEntry,
  recurringEntry,
  removeAllRecurringRounds,
}: removeRecurringRoundFromDb) => {
  if (auth.currentUser === null) {
    return
  }

  const recurringRoundDocRef = doc(
    db,
    'users',
    auth.currentUser.uid,
    'recurringRounds',
    roundId,
  )

  try {
    //if round plan is a single entry, remove single doc from planner and return
    if (singleEntry) {
      await removeScheduledRoundFromoDb({
        roundId: roundId,
        date: date,
        recurringRound: false,
      })
      console.log(`Single entry ${roundId} removed from planner collection`)
      return
    }

    //get recurring data from recurringRounds collection
    const recurringRoundDoc = await getDoc(recurringRoundDocRef)
    if (!recurringRoundDoc.exists()) {
      throw Error('No recurring round found')
    }

    const recurringRoundData = recurringRoundDoc.data()
    if (!recurringRoundData.recurringDates) {
      throw Error('No recurring dates found')
    }

    //if round is recurring entry and but only a single entry should be removed
    if (recurringEntry && removeAllRecurringRounds === false) {
      await removeScheduledRoundFromoDb({
        roundId: roundId,
        date: date,
        recurringRound: true,
      })

      await updateDoc(recurringRoundDocRef, {
        recurringDates: recurringRoundData.recurringDates.filter(
          (recurringDate: string) => recurringDate !== date,
        ),
      })

      console.log(
        `Single recurring entry ${roundId} removed from planner collection`,
      )
      return
    }

    //else remove all recurring rounds from planner and recurring rounds collection
    recurringRoundData.recurringDates.map(async (recurringDate: string) => {
      await removeScheduledRoundFromoDb({
        roundId: roundId,
        date: recurringDate,
        recurringRound: true,
      })
    })

    await deleteDoc(recurringRoundDocRef)

    console.log(
      `Recurring rounds for ${roundId} removed from planner and recurringRounds collection`,
    )
  } catch (error) {
    console.error(`Error removing round ${roundId} from db`, error)
  }
}
