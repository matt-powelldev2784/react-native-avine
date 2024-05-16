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
    const job = await getDoc(jobDoc)

    return { id: job.id, ...job.data() }
  } catch (error) {
    throw new Error(`Error adding job to db at addJob route: ${error}`)
  }
}
