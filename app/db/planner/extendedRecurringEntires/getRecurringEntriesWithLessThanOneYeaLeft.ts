import {
  doc,
  getDocs,
  collection,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { authError } from '../../authError'
import { addRound } from '../addRound/addRound'
import { formatDateForDb } from '../../../utils/formatDateForDb'
import { deleteSingleRecurringRound } from '../deleteRound/deleteSingleRecurringRound'

export const updateRecurringEntriesWithLessThanOneYeaLeft = async () => {
  if (!auth.currentUser) {
    return authError({
      filename: 'updateRecurringEntriesWithLessThanOneYeaLeft',
    })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const recurringRoundCollection = collection(userDoc, 'recurringRoundData')

    // Calculate the timestamp for 3 years from now in UTC
    const oneYearsFromNow = new Date()
    oneYearsFromNow.setUTCFullYear(oneYearsFromNow.getUTCFullYear() + 1)
    const oneYearsFromNowUTCDateString = new Timestamp(
      new Date(oneYearsFromNow.getTime()).getTime() / 1000,
      0,
    )

    const q = query(
      recurringRoundCollection,
      where('lastDateBooked', '<', oneYearsFromNowUTCDateString),
    )

    const querySnapshot = await getDocs(q)

    const expiringRecurringRoundDocs = querySnapshot.docs.map(
      (recurringDoc) => {
        const lastDateBookedTimestamp = recurringDoc.data().lastDateBooked
        const lastDateBookedDate = lastDateBookedTimestamp.toDate()
        const dbDateString = formatDateForDb(lastDateBookedDate)

        return {
          id: recurringDoc.id,
          lastDateBooked: dbDateString,
          roundId: recurringDoc.data().roundId,
        }
      },
    )

    console.log('expiringRecurringRoundDocs', expiringRecurringRoundDocs)

    expiringRecurringRoundDocs.forEach(async (doc) => {
      const dbDate = doc.lastDateBooked
      console.log('dbDate', dbDate)
      await deleteSingleRecurringRound({ date: dbDate, roundId: doc.roundId })

      await addRound({
        roundId: doc.roundId,
        recurring: true,
        date: dbDate,
        skipDeleteRecurringRounds: true,
      })
    })

    return expiringRecurringRoundDocs
  } catch (error) {
    throw new Error(
      `Error getting updating recurring entries updateRecurringEntriesWithLessThanOneYeaLeft route: ${error}`,
    )
  }
}
