import { auth } from '../../../firebaseConfig'
import { getJob } from '../jobs/getJob'
import { authError } from '../authError'

export const getTotalHoursForJobs = async (
  jobIds: string[],
): Promise<number> => {
  if (auth.currentUser === null) {
    return authError({ filename: 'getTotalHoursForJobs' })
  }

  try {
    const jobPromises = jobIds.map((jobId) => getJob(jobId))
    const jobs = await Promise.all(jobPromises)

    const totalHours = jobs.reduce((acc, job) => {
      if (job && job.hours) {
        return acc + Number(job.hours)
      }
      return acc
    }, 0)

    return totalHours
  } catch (error) {
    throw new Error(`Error getting total hours for jobs: ${error}`)
  }
}
