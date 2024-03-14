import { doc, query, where, getDocs, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { authError } from '../../authError'
import { getJob } from '../../jobs/getJob'

interface JobIsCompleteT {
  roundId: string
  jobId: string
  plannerDate: string
  recurringRound: boolean
}

export const getJobIsComplete = async ({
  roundId,
  jobId,
  plannerDate,
  recurringRound,
}: JobIsCompleteT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getJobIsComplete' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const plannerDoc = doc(userDoc, 'planner', plannerDate)
    const relatedJobSuffix = recurringRound ? 'recurringRound' : 'oneOffRound'

    const plannerSnapshot = await getDoc(plannerDoc)

    if (!plannerSnapshot.exists()) {
      throw new Error('Job not found in planner')
    }

    const plannerData = plannerSnapshot.data()

    const relatedJobString = `${roundId}@${jobId}@${relatedJobSuffix}`

    // if job is complete return job with jobIsComplete true property
    if (plannerData?.completedJobs?.includes(relatedJobString)) {
      const job = await getJob(jobId)
      const jobIsComplete = true
      return { ...job, jobIsComplete }
    }

    // if job is not complete return job with jobIsComplete false property
    if (plannerData?.relatedJobs?.includes(relatedJobString)) {
      const job = await getJob(jobId)
      const jobIsComplete = false
      return { ...job, jobIsComplete }
    }

    //if job not found in planner throw error
    throw new Error('Job not found in planner')
  } catch (error) {
    throw new Error(
      `Error getting job is complete at getJobIsComplete route: ${error}`,
    )
  }
}
