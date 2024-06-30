import { getDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getJob } from '../../jobs/getJob'

interface getPlannerRoundTicketT {
  plannerDate: string
  roundId: string
  recurringRound: boolean
}

export const getPlannerRoundTicket = async ({
  plannerDate,
  roundId,
  recurringRound,
}: getPlannerRoundTicketT) => {
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
        const roundTypeString = recurringRound
          ? 'recurringRound'
          : 'oneOffRound'

        const jobIsComplete = completdJobs.includes(
          `${roundId}@${jobId}@${roundTypeString}`,
        )

        const job = await getJob(jobId)
        return { ...job, id: jobId, jobIsComplete }
      }),
    )

    const roundDataWithId = {
      id: roundDoc.id,
      ...roundDocData,
      relatedJobs: relatedJobsData,
      recurringRound: false,
    }

    return roundDataWithId
  } catch (error) {
    console.error(error)
    throw error
  }
}
