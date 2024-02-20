import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { getJobById } from '../jobs/getJobById'

export const getRelatedJobsByRoundId = async (roundId: string) => {
  if (auth.currentUser === null) {
    return {
      success: false,
      status: 401,
      message: 'User not authenticated',
    }
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundDocRef = doc(userDoc, 'rounds', roundId)

    const roundDoc = await getDoc(roundDocRef)
    if (!roundDoc.exists()) {
      throw new Error('No such round found')
    }

    const relatedJobs = roundDoc.data().relatedJobs

    const getRelatedJobsData = relatedJobs.map(async (jobId: string) => {
      const job = await getJobById(jobId)
      return job
    })

    const relatedJobData = await Promise.all(getRelatedJobsData)

    return {
      success: true,
      status: 200,
      message: `Jobs related to ${roundId} retrieved`,
      data: {
        relatedJobs: relatedJobData,
      },
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: `An error occurred while gettiing jobs related to ${roundId}`,
    }
  }
}
