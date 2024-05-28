import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { JobT } from '../../types/JobT'
import { authError } from '../authError'
import { splitStringToLowerCaseArray } from '../../utils/splitStringToLowerCaseArray'

export const addJob = async (jobData: JobT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'addJobToDb' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)

    const jobsCollection = collection(userDoc, 'jobs')
    const jobDoc = doc(jobsCollection)

    await setDoc(jobDoc, {
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
    const job = await getDoc(jobDoc)

    return { id: job.id, ...job.data() }
  } catch (error) {
    throw new Error(`Error adding job to db at addJob route: ${error}`)
  }
}
