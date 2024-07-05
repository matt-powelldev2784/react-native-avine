import { auth } from '../../../../firebaseConfig'
import { ExtendedPlannerRoundsDataT } from '../../../types/RoundT'
import { getOneOffRounds } from './getOneOffRounds'
import { getRecurringRounds } from './getRecurringRounds'



export const getRoundsByPlannerDates = async (plannerDates: string[]) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const roundsData: ExtendedPlannerRoundsDataT[] = []

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
