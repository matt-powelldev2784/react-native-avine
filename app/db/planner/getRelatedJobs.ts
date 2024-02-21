import { getDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { getJobById } from '../jobs/getJobById'

export const getRelatedJobs = async (plannerDate: string) => {
  if (auth.currentUser === null) {
    return
  }

  console.log('plannerDate', plannerDate)

  try {
    const plannerDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'planner',
      plannerDate,
    )

    //get planner document
    const plannerDoc = await getDoc(plannerDocRef)
    const plannerDocData = plannerDoc.data()

    console.log('plannerDocData', plannerDocData)

    const relatedRoundsData = plannerDocData?.relatedRounds || []
    relatedRoundsData.map(async (roundId: string) => {
      if (auth.currentUser === null) {
        return
      }

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

      const relatedJobsData = relatedJobs.map(async (jobId: string) => {
        const jobIsComplete = completdJobs.includes(jobId)

        const job = await getJobById(jobId)
        return { ...job, jobIsComplete }
      })

      const roundDataWithId = {
        id: roundDoc.id,
        ...roundDocData,
        relatedJobs: relatedJobsData,
      }

      return roundDataWithId
    })
  } catch (error) {
    return { error }
  }
}
