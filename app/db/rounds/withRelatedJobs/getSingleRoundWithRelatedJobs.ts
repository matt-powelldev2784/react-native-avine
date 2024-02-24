import { auth } from '../../../../firebaseConfig'
import { authError } from '../../authError'
import { getJobsRelatedToRoundId } from './getJobsRelatedToRoundId'
import { getRound } from '../getRound'

export const getSingleRoundWithRelatedJobs = async (roundId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getSingleRoundWithRelatedJobs' })
  }

  try {
    const round = await getRound(roundId)
    const relatedJobs = await getJobsRelatedToRoundId(roundId)

    const roundWithRelatedJobs = {
      ...round,
      relatedJobs,
    }

    return roundWithRelatedJobs
  } catch (error) {
    throw new Error(
      `Error get rounds with related jobs at getSingleRoundWithRelatedJobs route: ${error}`,
    )
  }
}
