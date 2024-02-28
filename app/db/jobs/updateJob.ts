import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobWithIdT } from '../../types/JobT'
import { authError } from '../authError'

export const updateJob = async (jobData: JobWithIdT) => {
  if (auth.currentUser === null) {
    return authError({ filename: 'updateJob' })
  }

  try {
    const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobData.id)

    await updateDoc(jobDocRef, {
      jobName: jobData.jobName,
      address: jobData.address,
      town: jobData.town,
      postcode: jobData.postcode,
      jobType: jobData.jobType,
      time: jobData.time,
      price: jobData.price,
      frequency: jobData.frequency,
      contactName: jobData.contactName,
      contactTel: jobData.contactTel,
      notes: jobData.notes,
      isDeleted: jobData.isDeleted,
    })

    const updatedJob = await getDoc(jobDocRef)
    const updatedJobData = { id: updatedJob.id, ...updatedJob.data() }

    return updatedJobData
  } catch (error) {
    throw new Error(`Error updating job detail at updateJob route: ${error}`)
  }
}
