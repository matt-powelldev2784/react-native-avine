import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'

interface deleteRecurringDateT {
  roundId: string
  date: string
}

// deletes a recurring date from the recurringRounds collection
export const deleteRecurringDate = async ({
  roundId,
  date,
}: deleteRecurringDateT) => {
  if (auth.currentUser === null) {
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

    if (!recurringRoundDocRef) {
      throw Error('Recurring round does not exist')
    }

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
