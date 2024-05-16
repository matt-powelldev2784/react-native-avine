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
      _searchjobName: splitStringToLowerCaseArray(jobData.jobName),
      _searchaddress: splitStringToLowerCaseArray(jobData.address),
      _searchtown: splitStringToLowerCaseArray(jobData.town),
      _searchpostcode: splitStringToLowerCaseArray(jobData.postcode),
      _searchjobType: splitStringToLowerCaseArray(jobData.jobType),
      _searchtime: splitStringToLowerCaseArray(jobData.time),
      _searchprice: splitStringToLowerCaseArray(jobData.address),
      _searchfrequency: splitStringToLowerCaseArray(jobData.frequency),
      _searchcontactName: splitStringToLowerCaseArray(jobData.contactName),
      _searchcontactTel: splitStringToLowerCaseArray(jobData.contactTel.toString()),
    })

    const updatedJob = await getDoc(jobDocRef)
    const updatedJobData = { id: updatedJob.id, ...updatedJob.data() }

    return updatedJobData
  } catch (error) {
    throw new Error(`Error updating job detail at updateJob route: ${error}`)
  }
}
