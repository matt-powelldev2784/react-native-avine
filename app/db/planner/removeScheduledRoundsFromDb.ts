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
      return {
        success: true,
        status: 200,
        message: `Single entry ${roundId} removed from planner collection`,
      }
    }

    //get recurring data from recurringRounds collection
    const recurringRoundDoc = await getDoc(recurringRoundDocRef)
    if (!recurringRoundDoc.exists()) {
      return {
        success: false,
        status: 500,
        message: `No recurring round with round id ${roundId} in recurrring rounds collection`,
      }
    }

    const recurringRoundData = recurringRoundDoc.data()
    if (!recurringRoundData.recurringDates) {
      return {
        success: false,
        status: 500,
        message: `No recurring dates found with round id ${roundId} in recurrring rounds collection`,
      }
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

      return {
        success: false,
        status: 200,
        message: `Single recurring entry with round id ${roundId} removed from planner collection and ${date} removed from recurringRounds collection`,
      }
    }

    //else remove all recurring rounds from planner and recurring rounds collection
    await Promise.all(
      recurringRoundData.recurringDates.map((recurringDate: string) => {
        return removeScheduledRoundFromoDb({
          roundId: roundId,
          date: recurringDate,
          recurringRound: true,
        })
      }),
    )

    await deleteDoc(recurringRoundDocRef)

    return {
      success: true,
      status: 200,
      message: `All recurring rounds with round id ${roundId} removed from planner and recurringRounds collection`,
    }
  } catch (error) {
    console.error(`Error removing round ${roundId} from db`, error)
  }
}
