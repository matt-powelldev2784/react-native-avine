import { auth } from '../../../../firebaseConfig'
import { addRecurringRound } from './addRecurringRound'
import { deleteRecurringDate } from './deleteRecurringDate'
import { addOneOffRound } from './addOneOffRound'
import { addRecurringData } from './addRecurringData'

interface planInfoT {
  roundId: string
  date: string
  recurring: boolean
}

export const addRound = async ({ recurring, roundId, date }: planInfoT) => {
  if (auth.currentUser === null) {
    return
  }
  try {
    if (recurring) {
      const recurringData = await addRecurringData({
        recurringRound: recurring,
        roundId,
        date,
      })

      if (!recurringData) {
        throw new Error('No recurring data')
      }

      const recurringDates = recurringData?.recurringDates
      if (!recurringDates) {
        throw new Error('No recurring dates')
      }

      await addRecurringRound({
        recurringRound: recurring,
        roundId,
        recurringDates,
      })
    }

    if (!recurring) {
      await addOneOffRound({ recurringRound: recurring, roundId, date })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
