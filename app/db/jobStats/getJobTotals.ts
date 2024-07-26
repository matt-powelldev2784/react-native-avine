import { auth } from '../../../firebaseConfig'
import { getJob } from '../jobs/getJob'
import { authError } from '../authError'

export const getJobTotals = async (
  jobIds: string[],
): Promise<{
  totalTime: number
  totalPrice: number
  jobCount: number
}> => {
  if (auth.currentUser === null) {
    return authError({ filename: 'getJobTotals' })
  }

  try {
    const jobPromises = jobIds.map((jobId) => getJob(jobId))
    const jobs = await Promise.all(jobPromises)

    const totals = jobs.reduce(
      (acc, job) => {
        if (job) {
          acc.totalTime += Number(job.time)
          acc.totalPrice += Number(job.price)
        }
        return acc
      },
      { totalTime: 0, totalPrice: 0, jobCount: jobs.length },
    )

    return totals
  } catch (error) {
    throw new Error(`Error getting job totals: ${error}`)
  }
}
