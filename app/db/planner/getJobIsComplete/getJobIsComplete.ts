import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { authError } from '../../authError'

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

    // if job is complete return jobIsComplete true property
    if (plannerData?.completedJobs?.includes(relatedJobString)) {
      const jobIsComplete = true
      return { jobIsComplete }
    }

    // if job is not complete return jobIsComplete false property
    if (plannerData?.relatedJobs?.includes(relatedJobString)) {
      const jobIsComplete = false
      return { jobIsComplete }
    }

    //if job not found in planner throw error
    throw new Error('Job not found in planner')
  } catch (error) {
    throw new Error(
      `Error getting job is complete at getJobIsComplete route: ${error}`,
    )
  }
}
