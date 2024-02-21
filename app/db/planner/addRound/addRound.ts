import { auth } from '../../../../firebaseConfig'
import { addRecurringRound } from './addRecurringRound'
import { deleteRecurringDate } from './deleteRecurringDate'
import { addOneOffRound } from './addOneOffRound'

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
      await addRecurringRound({ recurringRound: recurring, roundId, date })
      await deleteRecurringDate({ recurringRound: recurring, roundId, date })
    }

    if (!recurring) {
      await addOneOffRound({ recurringRound: recurring, roundId, date })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
