import { auth } from '../../../../firebaseConfig'
import { RoundWithRelatedJobsT } from '../../../types/RoundT'
import { getOneOffRounds } from './getOneOffRounds'
import { getRecurringRounds } from './getRecurringRounds'

interface RoundData extends RoundWithRelatedJobsT {
  recurringRound: boolean
}

export const getRoundsByPlannerDate = async (plannerDate: string) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const oneOffRounds = (await getOneOffRounds(plannerDate)) || []
    const recurringRounds = (await getRecurringRounds(plannerDate)) || []
    const roundData = [...oneOffRounds, ...recurringRounds]

    console.log('roundData---------', roundData)

    return roundData as RoundData[]
  } catch (error) {
    console.error(error)
    throw error
  }
}
