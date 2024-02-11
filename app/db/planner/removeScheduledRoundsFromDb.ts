import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { removeScheduledRoundFromoDb } from './removeScheduledRoundFromDb'

interface removeRecurringRoundFromDb {
  date: string
  roundId: string
}

export const removeScheduledRoundsFromDb = async ({
  date,
  roundId,
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
    const recurringRoundDoc = await getDoc(recurringRoundDocRef)

    //if recurring round does not exist, remove single doc from planner and return
    if (!recurringRoundDoc.exists()) {
      await removeScheduledRoundFromoDb({
        roundId: roundId,
        date: date,
        recurringRound: false,
      })
      console.log(`${roundId} removed from planner collection`)
      return
    }

    //remove each recurring round from planner and recurring rounds collection
    const recurringRoundData = recurringRoundDoc.data()

    if (!recurringRoundData.recurringDates) {
      throw Error('No recurring dates found')
    }

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
