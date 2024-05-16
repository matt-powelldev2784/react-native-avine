import { auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { addJob } from '../jobs/addJob'

export const addJobSeeds = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'addJobSeeds' })
  }

  try {
    const jobSeed = {
      jobName: 'Job Name',
      address: '34 Name Road Seed',
      town: 'Seed Town',
      postcode: 'SEE D11',
      jobType: 'Front',
      time: '2',
      price: 100,
      frequency: '52 Weekly',
      contactName: 'Seed Name',
      contactTel: '07889 996161',
      notes: 'Notes',
      clientId: 'hCm2FKZTJoMDmd66mNgE',
      isDeleted: false,
    }

    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
    // await addJob(jobSeed)
  } catch (error) {
    throw new Error(`Error adding job to db at addJobSeeds route: ${error}`)
  }
}
