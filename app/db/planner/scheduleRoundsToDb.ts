import { auth } from '../../../firebaseConfig'
import { addRecurringRound } from './addRound/addRecurringRound'
import { deleteRecurringDate } from './addRound/deleteRecurringDate'
import { addOneOffRound } from './addRound/addOneOffRound'

interface planInfoT {
  roundId: string
  date: string
  recurring: boolean
}

export const scheduleRoundsToDb = async ({
  recurring,
  roundId,
  date,
}: planInfoT) => {
  if (auth.currentUser === null) {
    return
  }

  if (recurring) {
    await addRecurringRound({ recurringRound: recurring, roundId, date })
    await deleteRecurringDate({ recurringRound: recurring, roundId, date })
  }

  if (!recurring) {
    await addOneOffRound({ recurringRound: recurring, roundId, date })
  }

  try {
  } catch (error) {
    return { error }
  }
}
