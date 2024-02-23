import { auth } from '../../../firebaseConfig'
import { getJob } from '../jobs/getJob'
import { authError } from '../authError'
import { getRound } from './getRound'

export const getJobsRelatedToRoundId = async (roundId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getRoundsWithRelatedJobs' })
  }

  try {
    const round = await getRound(roundId)
    const relatedJobIds = round.relatedJobs ? round.relatedJobs : []

    const relatedJobsPromises = relatedJobIds.map((jobId: string) => {
      const job = getJob(jobId)
      return job
    })
    const relatedJobs = await Promise.all(relatedJobsPromises)

    return relatedJobs
  } catch (error) {
    throw new Error(
      `Error getting jobs relayed to ${roundId} at getJobsRelatedToRoundId route: ${error}`,
    )
  }
}
