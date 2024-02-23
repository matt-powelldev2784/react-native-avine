import { doc, collection, getDocs, query } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { getJob } from '../jobs/getJob'
import { authError } from '../authError'

export const getRoundsWithRelatedJobs = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'getRoundsWithRelatedJobs' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundsCollection = collection(userDoc, 'rounds')
    const roundsQuery = query(roundsCollection)
    const roundsSnapshot = await getDocs(roundsQuery)
    const activeRounds = roundsSnapshot.docs.filter(
      (round) => round.data().isDeleted === false,
    )

    // roundData with return a array of rounds with related jobs
    const roundsData = await Promise.all(
      activeRounds.map(async (round) => {
        // Fetch all related jobs for the current round
        const relatedJobIds = round.data().relatedJobs
        const relatedJobsPromises = relatedJobIds.map((jobId: string) => {
          const job = getJob(jobId)
          return job
        })
        const relatedJobs = await Promise.all(relatedJobsPromises)

        // Return the round data with the related jobs
        return {
          id: round.id,
          roundName: round.data().roundName,
          location: round.data().location,
          frequency: round.data().frequency,
          relatedJobs,
        }
      }),
    )

    const sortedRoundData = roundsData.sort((a, b) =>
      a.roundName.localeCompare(b.roundName),
    )

    return sortedRoundData
  } catch (error) {
    throw new Error(
      `Error get rounds with related jobs at getRoundsWithRelatedJobs route: ${error}`,
    )
  }
}
