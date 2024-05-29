import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobWithIdT } from '../../types/JobT'
import { authError } from '../authError'
import { splitStringToLowerCaseArray } from '../../utils/splitStringToLowerCaseArray'

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
      clientId: jobData.clientId,
      isDeleted: jobData.isDeleted,
      _searchJobName: splitStringToLowerCaseArray(jobData.jobName),
      _searchAddress: splitStringToLowerCaseArray(jobData.address),
      _searchTown: splitStringToLowerCaseArray(jobData.town),
      _searchPostcode: splitStringToLowerCaseArray(jobData.postcode),
      _searchJobType: splitStringToLowerCaseArray(jobData.jobType),
      _searchTime: splitStringToLowerCaseArray(jobData.time),
      _searchPrice: splitStringToLowerCaseArray(jobData.price.toString()),
      _searchFrequency: splitStringToLowerCaseArray(jobData.frequency),
      _searchContactName: splitStringToLowerCaseArray(jobData.contactName),
      _searchContactTel: splitStringToLowerCaseArray(
        jobData.contactTel.toString(),
      ),
    })

    const updatedJob = await getDoc(jobDocRef)
    const updatedJobData = { id: updatedJob.id, ...updatedJob.data() }

    return updatedJobData
  } catch (error) {
    throw new Error(`Error updating job detail at updateJob route: ${error}`)
  }
}
