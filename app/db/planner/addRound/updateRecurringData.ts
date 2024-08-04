import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getRound } from '../../rounds/getRound'
import { getRecurringDatesTwoYearsAhead } from '../../../utils/getRecurringDates2YearsAhead'
import { convertDbDateToDateString } from '../../../utils/convertDbDateToDateString'
import { authError } from '../../authError'

interface addRecurringRoundT {
  roundId: string
  date: string
  recurringRound: boolean
}

//add recurring data to recurring data collection
export const updateRecurringData = async ({
  recurringRound,
  roundId,
  date,
}: addRecurringRoundT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'updateRecurringData' })
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
      throw Error('Round document does not exist at updateRecurringData')
    }

    const recurringRoundDoc = await getDoc(recurringRoundDocRef)

    if (!recurringRoundDoc.exists()) {
      throw Error(
        'Recurring round document does not exist at updateRecurringData',
      )
    }

    const currentRecurringRoundDates = recurringRoundDoc.data().recurringDates
    console.log('currentRecurringRoundDates', currentRecurringRoundDates)

    const newRecurringDates = getRecurringDatesTwoYearsAhead(
      date,
      round.frequency,
    )

    const mergedRecurringDates = [
      ...currentRecurringRoundDates,
      ...newRecurringDates,
    ]
    console.log('mergedRecurringDates', mergedRecurringDates)

    const createTimeStanp = (date: string) => {
      const dateString = convertDbDateToDateString(date)
      const timestamp = new Timestamp(new Date(dateString).getTime() / 1000, 0)
      return timestamp
    }
    const lastDateBooked = createTimeStanp(
      newRecurringDates[newRecurringDates.length - 1],
    )

    await setDoc(recurringRoundDocRef, {
      roundId: roundId,
      startDate: date,
      lastDateBooked: lastDateBooked,
      frequency: round.frequency,
      recurringDates: mergedRecurringDates,
    })

    const updatedrecurringRoundDoc = await getDoc(recurringRoundDocRef)
    const recurringRoundData = updatedrecurringRoundDoc.data()
    return recurringRoundData
  } catch (error) {
    throw new Error(
      `Error updating recurring data at updateRecurringData route: ${error}`,
    )
  }
}
