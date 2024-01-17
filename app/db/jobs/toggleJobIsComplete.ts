import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

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
    console.error('No user signed in')
    return
  }

  const plannerDateDocRef = doc(
    db,
    'users',
    auth.currentUser.uid,
    'planner',
    plannerDate,
  )

  try {
    if (isComplete) {
      await updateDoc(plannerDateDocRef, {
        completedJobs: arrayUnion(jobId),
      })
      console.log(`Job id ${jobId} set to complete`)
    } else {
      await updateDoc(plannerDateDocRef, {
        completedJobs: arrayRemove(jobId),
      })
      console.log(`Job id ${jobId} set to incomplete`)
    }
  } catch (error) {
    console.error('Error updating job:', error)
  }
}
