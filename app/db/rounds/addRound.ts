import {
  doc,
  runTransaction,
  collection,
  getDoc,
  arrayUnion,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundT } from '../../types/RoundT'
import { authError } from '../authError'

export const addRound = async (roundData: RoundT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'addRound' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundsCollection = collection(userDoc, 'rounds')
    const roundDoc = doc(roundsCollection)

    await runTransaction(db, async (transaction) => {
      // add round to rounds collection
      transaction.set(roundDoc, {
        roundName: roundData.roundName,
        location: roundData.location,
        frequency: roundData.frequency,
        relatedJobs: [],
        isDeleted: false,
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
    throw new Error(`Error adding job to db at addRound route: ${error}`)
  }
}
