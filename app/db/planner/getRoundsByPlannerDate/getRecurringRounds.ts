import { getDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getJobById } from '../../jobs/getJobById'
import { RoundWithRelatedJobsT } from '../../../types/RoundT'

export const getRecurringRounds = async (plannerDate: string) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const plannerDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'planner',
      plannerDate,
    )

    const plannerDoc = await getDoc(plannerDocRef)
    const plannerDocData = plannerDoc.data()

    const recurringRounds = plannerDocData?.recurringRounds || []

    const roundData = await Promise.all(
      recurringRounds.map(async (roundInfo: string) => {
        if (auth.currentUser === null) {
          return
        }

        const roundId = roundInfo.split('/')[0]

        const roundDocRef = doc(
          db,
          'users',
          auth.currentUser.uid,
          'rounds',
          roundId,
        )

        const roundDoc = await getDoc(roundDocRef)
        const roundDocData = roundDoc.data()
        const relatedJobs = roundDocData?.relatedJobs || []
        const completdJobs = plannerDocData?.completedJobs || []

        const relatedJobsData = await Promise.all(
          relatedJobs.map(async (jobId: string) => {
            const jobIsComplete = completdJobs.includes(jobId)

            const job = await getJobById(jobId)
            return { ...job, id: jobId, jobIsComplete }
          }),
        )

        const roundDataWithId = {
          id: `${roundDoc.id}`,
          ...roundDocData,
          relatedJobs: relatedJobsData,
          recurringRound: true,
        }

        return roundDataWithId
      }),
    )

    return roundData as RoundWithRelatedJobsT[]
  } catch (error) {
    console.error(error)
    throw error
  }
}
