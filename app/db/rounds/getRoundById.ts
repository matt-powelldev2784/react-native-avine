
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError, responseError, responseSuccess } from '../utils/response'
import { getJobById } from '../jobs/getJobById'

export const getRoundById = async (roundId: string): responseErr=> {
  if (auth.currentUser === null) {
    return authError()
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundDocRef = doc(userDoc, 'rounds', roundId)

    const roundDoc = await getDoc(roundDocRef)
    if (!roundDoc.exists()) {
      throw new Error('No such round found')
    }

    const rounData = {
      ...roundDoc.data(),
    }

    const relatedJobs = rounData.relatedJobs
    if (!relatedJobs) {
      throw new Error('Error getting related jobs data')
    }

    const relatedJobsData = await Promise.all(
      relatedJobs.map((jobId: string) => getJobById(jobId)),
    )

    return responseSuccess({
      success: true,
      status: 200,
      message: 'Round and related job data retrieved',
      data: {
        round: { ...rounData, id: roundDoc.id },
        relatedJobs: relatedJobsData,
      },
    })
  } catch (error) {
    return responseError({
      success: false,
      status: 500,
      message: 'An error occurred while gettiing round and related job data',
    })
  }
}
