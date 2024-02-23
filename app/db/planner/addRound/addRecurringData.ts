import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getRound } from '../../rounds/getRound'
import { getRecurringDatesTwoYearsAhead } from '../../../utils/getRecurringDates2YearsAhead'

interface addRecurringRoundT {
  roundId: string
  date: string
  recurringRound: boolean
}

//add recurring data to recurring data collection
export const addRecurringData = async ({
  recurringRound,
  roundId,
  date,
}: addRecurringRoundT) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    if (!recurringRound) {
      return
    }

    const recurringRoundDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'recurringRoundData',
      roundId,
    )

    const round = await getRound(roundId)
    if (!round) {
      return
    }

    const recurringDates = getRecurringDatesTwoYearsAhead(date, round.frequency)

    await setDoc(recurringRoundDocRef, {
      roundId: roundId,
      startDate: date,
      frequency: round.frequency,
      recurringDates: recurringDates,
    })

    const recurringRoundDoc = await getDoc(recurringRoundDocRef)
    const recurringRoundData = recurringRoundDoc.data()
    return recurringRoundData
  } catch (error) {
    return { error }
  }
}
