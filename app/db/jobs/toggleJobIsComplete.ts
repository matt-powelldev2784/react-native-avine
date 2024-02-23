import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

interface UpdateJobInDb {
  plannerDate: string
  jobId: string
  isComplete: boolean
}

export const toggleJobIsComplete = async ({
  jobId,
  plannerDate,
  isComplete,
}: UpdateJobInDb) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'toggleJobIsComplete' })
  }

  try {
    const plannerDateDocRef = doc(
      db,
      'users',
      auth.currentUser.uid,
      'planner',
      plannerDate,
    )

    if (isComplete === true) {
      await updateDoc(plannerDateDocRef, {
        completedJobs: arrayUnion(jobId),
      })
      return { message: `Job id ${jobId} set to complete`, isComplete: true }
    }

    if (isComplete === false) {
      await updateDoc(plannerDateDocRef, {
        completedJobs: arrayRemove(jobId),
      })
      return { message: `Job id ${jobId} set to incomplete`, isComplete: false }
    }
  } catch (error) {
    throw new Error(
      `Error updating job is complete status at toggleJobIsComplete route: ${error}`,
    )
  }
}
