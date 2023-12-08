import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { DocumentData } from '@google-cloud/firestore'

type Round = {
  roundData: DocumentData
  jobs: DocumentData[]
}

const processJobsData = async (userDoc: any, roundData: any) => {
  const jobs = []

  for (const job of roundData.jobs) {
    const jobDocRef = doc(userDoc, 'jobs', job.id)
    const jobDoc = await getDoc(jobDocRef)
    const jobData = jobDoc.data()
    if (jobData) {
      jobs.push(jobData)
    }
  }
  return jobs
}

export const getRoundsFromDb = async (): Promise<Round[]> => {
  if (auth.currentUser === null) {
    return []
  }
  const collatedRoundData: Round[] = []

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const roundsCollection = collection(userDoc, 'rounds')
  const roundDocsSnapshot = await getDocs(roundsCollection)

  for (const roundDoc of roundDocsSnapshot.docs) {
    const roundData = roundDoc.data()
    const jobs = await processJobsData(userDoc, roundData)
    const round: Round = {
      roundData: roundData,
      jobs: jobs,
    }
    collatedRoundData.push(round)
  }

  console.log('Rounds retrieved:', collatedRoundData)
  return collatedRoundData
}
