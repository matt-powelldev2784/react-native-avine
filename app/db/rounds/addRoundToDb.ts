import {
  doc,
  getDoc,
  collection,
  runTransaction,
  arrayUnion,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundT } from '../../types/RoundT'
import { authError, responseError, responseSuccess } from '../utils/response'

export const addRoundToDb = async (roundData: RoundT) => {
  if (auth.currentUser === null) {
    return authError()
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
    const round = roundSnapshot.data()

    return responseSuccess({
      success: true,
      status: 200,
      message: `Round id ${roundSnapshot.id} added to database`,
      data: {
        id: roundSnapshot.id,
        ...round,
      },
    })
  } catch (error) {
    return responseError({
      success: false,
      status: 500,
      message: 'An error occurred while adding the round to the database',
    })
  }
}
