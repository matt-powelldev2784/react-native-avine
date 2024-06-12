import { auth } from '../../../firebaseConfig'
import { RoundWithRecurringFlagT } from '../../types/RoundT'
import { authError } from '../authError'
import { toggleJobIsComplete } from './toggleJobIsComplete'

interface batchToggleJobIsCompleteT {
  round: RoundWithRecurringFlagT
  plannerDate: string
}

export const batchToggleJobIsComplete = async ({
  round,
  plannerDate,
}: batchToggleJobIsCompleteT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'batchToggleJobIsComplete' })
  }

  try {
    const roundRecurringFlag = round.recurringRound
      ? 'recurringRound'
      : 'oneOffRound'
    const relatedJobs = round.relatedJobs

    relatedJobs.forEach(async (job) => {
      const plannerJobRef = `${round.id}@${job.id}@${roundRecurringFlag}`

      await toggleJobIsComplete({
        plannerJobRef,
        plannerDate,
        isComplete: true,
      })
    })
  } catch (error) {
    throw new Error(
      `Error updating job is complete status at batchToggleJobIsComplete route: ${error}`,
    )
  }
}
