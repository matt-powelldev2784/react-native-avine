import { auth } from '../../../../firebaseConfig'
import { RoundWithRecurringFlagT } from '../../../types/RoundT'
import { getOneOffRounds } from './getOneOffRounds'
import { getRecurringRounds } from './getRecurringRounds'

export const getRoundsByPlannerDate = async (plannerDate: string) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const oneOffRounds = (await getOneOffRounds(plannerDate)) || []
    const recurringRounds = (await getRecurringRounds(plannerDate)) || []
    const roundData = [...oneOffRounds, ...recurringRounds]

    return roundData as RoundWithRecurringFlagT[]
  } catch (error) {
    console.error(error)
    throw error
  }
}
