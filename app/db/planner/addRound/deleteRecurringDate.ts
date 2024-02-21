import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'

interface deleteRecurringDateT {
  roundId: string
  date: string
  recurringRound: boolean
}

// deletes a recurring date from the recurringRounds collection
export const deleteRecurringDate = async ({
  recurringRound,
  roundId,
  date,
}: deleteRecurringDateT) => {
  if (auth.currentUser === null) {
    return
  }

  if (!recurringRound) {
    return
  }

  try {
    const recurringRoundDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'recurringRounds',
      roundId,
    )

    const recurringRoundDoc = await getDoc(recurringRoundDocRef)
    if (recurringRoundDoc.exists()) {
      const recurringRoundData = recurringRoundDoc.data()

      if (recurringRoundData?.recurringDates) {
        await updateDoc(recurringRoundDocRef, {
          recurringDates: recurringRoundData.recurringDates.filter(
            (recurringDate: string) => recurringDate !== date,
          ),
        })
      }
    }
  } catch (error) {
    return { error }
  }
}
