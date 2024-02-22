import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { deleteSingleRecurringRound } from './deleteSingleRecurringRound'

interface deleteOneOffRoundT {
  roundId: string
}

export const deleteAllRecurringRounds = async ({
  roundId,
}: deleteOneOffRoundT) => {
  try {
    if (auth.currentUser === null) {
      return
    }

    const recurringRoundDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'recurringRoundData',
      roundId,
    )
    const recurringRoundDoc = await getDoc(recurringRoundDocRef)
    const recurringRoundData = recurringRoundDoc.data()
    const recurringRoundDates = recurringRoundData?.recurringDates || []

    for (const recurringDate of recurringRoundDates) {
      await deleteSingleRecurringRound({ roundId, date: recurringDate })
    }
    await deleteDoc(recurringRoundDocRef)
  } catch (error) {
    console.error(`Error removing recurring round ${roundId} from db`, error)
  }
}
