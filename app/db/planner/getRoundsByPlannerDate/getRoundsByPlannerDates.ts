import { auth } from '../../../../firebaseConfig'
import { RoundWithRecurringFlagT } from '../../../types/RoundT'
import { getOneOffRounds } from './getOneOffRounds'
import { getRecurringRounds } from './getRecurringRounds'

interface RoundsDataT {
  plannerDate: string
  rounds: RoundWithRecurringFlagT[]
}

export const getRoundsByPlannerDates = async (plannerDates: string[]) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const roundsData: RoundsDataT[] = []

    for (const plannerDate of plannerDates) {
      const oneOffRounds = (await getOneOffRounds(plannerDate)) || []
      const recurringRounds = (await getRecurringRounds(plannerDate)) || []
      roundsData.push({
        plannerDate,
        rounds: [...oneOffRounds, ...recurringRounds],
      })
    }

    return roundsData
  } catch (error) {
    console.error(error)
    throw error
  }
}
