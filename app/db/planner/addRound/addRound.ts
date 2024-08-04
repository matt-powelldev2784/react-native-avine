import { auth } from '../../../../firebaseConfig'
import { addRecurringRound } from './addRecurringRound'
import { addOneOffRound } from './addOneOffRound'
import { addRecurringData } from './addRecurringData'
import { checkIfRecurringRoundExists } from '../getRoundsByPlannerDate/checkIfRecurringRoundExists'
import { deleteAllRecurringRounds } from '../deleteRound/deleteAllRecurrringRounds'
import { updateRecurringData } from './updateRecurringData'

interface planInfoT {
  roundId: string
  date: string
  recurring: boolean
  skipDeleteRecurringRounds?: boolean
}

export const addRound = async ({
  recurring,
  roundId,
  date,
  skipDeleteRecurringRounds,
}: planInfoT) => {
  if (auth.currentUser === null) {
    return
  }
  try {
    console.log('test')

    if (recurring) {
      const roundExistsData = await checkIfRecurringRoundExists({ roundId })
      const roundExists = roundExistsData?.recurringRoundExists || false
      if (roundExists && !skipDeleteRecurringRounds) {
        await deleteAllRecurringRounds({ roundId })
      }

      let recurringData

      if (!skipDeleteRecurringRounds) {
        recurringData = await addRecurringData({
          recurringRound: recurring,
          roundId,
          date,
        })
      } else {
        recurringData = await updateRecurringData({
          recurringRound: recurring,
          roundId,
          date,
        })
      }

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
