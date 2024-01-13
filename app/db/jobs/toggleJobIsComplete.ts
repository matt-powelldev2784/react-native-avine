import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

interface UpdateJobInDb {
  jobId: string
  date: string
  isComplete: boolean
}

export const toggleJobIsComplete = async ({
  jobId,
  date,
  isComplete,
}: UpdateJobInDb) => {
  if (auth.currentUser === null) {
    console.error('No user signed in')
    return
  }

  const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)

  const scheduledDateDbPath = 'scheduledDatesInfo.' + date + '.isComplete'
  console.log(
    'scheduledDateDbPath------------------------------------------------------',
    scheduledDateDbPath,
  )

  try {
    await updateDoc(jobDocRef, {
      [scheduledDateDbPath]: isComplete,
    })
    console.log('Job updated with ID:', jobId)
  } catch (error) {
    console.error('Error updating job:', error)
  }
}
