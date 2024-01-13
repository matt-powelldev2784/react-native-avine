import { getDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

export const getRoundsandJobsByPlannerDate = async (docId: string) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    const plannerDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'planner',
      docId,
    )

    //get planner document
    const plannerDoc = await getDoc(plannerDocRef)
    const plannerDocData = plannerDoc.data()

    //get schduled jobs from planner document
    //this returns all jobs which are scheduled for a specific date (i.e a small data set)
    //these jobs which relate to rounds are filtered below using the linkedRounds property from the job document
    const relatedJobData = plannerDocData?.relatedJobs
    const relatedJobs = await Promise.all(
      relatedJobData.map(async (jobId: string) => {
        if (auth.currentUser === null) {
          return
        }

        const roundDocRef = doc(
          db,
          'users',
          auth.currentUser.uid,
          'jobs',
          jobId,
        )
        const jobDoc = await getDoc(roundDocRef)
        const jobDocData = jobDoc.data()

        return jobDocData
      }),
    )

    //get round documents
    const relatedRoundsData = plannerDocData?.relatedRounds
    const relatedRounds = await Promise.all(
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
        const roundDocData = {
          id: roundDoc.id,
          ...roundDoc.data(),
          relatedJobs: relatedJobs?.filter((job) =>
            job.linkedRounds.includes(roundDoc.id),
          ),
        }

        return roundDocData
      }),
    )

    console.log('Scheduled rounds and related jobs for planner:', relatedRounds)

    return relatedRounds
  } catch (error) {
    console.error('Error querying scheduled rounds and jobs:', error)
  }
}
