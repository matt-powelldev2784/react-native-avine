import {
  doc,
  runTransaction,
  collection,
  getDoc,
  arrayUnion,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundT } from '../../types/RoundT'

export const addRoundToDb = async (roundData: RoundT) => {
  if (auth.currentUser === null) {
    return
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const roundsCollection = collection(userDoc, 'rounds')
  const roundDoc = doc(roundsCollection)

  try {
    await runTransaction(db, async (transaction) => {
      transaction.set(roundDoc, {
        roundName: roundData.roundName,
        location: roundData.location,
        frequency: roundData.frequency,
        relatedJobs: [],
      })

      //add related job id's to round doc
      const relatedJobIds = roundData.relatedJobs

      if (!relatedJobIds) {
        throw new Error('No related jobs array provided')
      }

      relatedJobIds.forEach((jobId) => {
        transaction.update(roundDoc, {
          relatedJobs: arrayUnion(jobId),
        })
      })
    })

    const roundSnapshot = await getDoc(roundDoc)
    const round = { id: roundSnapshot.id, ...roundSnapshot.data() }

    return round
  } catch (error) {
    return { error }
  }
}
