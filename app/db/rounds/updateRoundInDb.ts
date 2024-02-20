import {
  doc,
  getDoc,
  runTransaction,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundWithIdT } from '../../types/RoundT'
import { authError } from '../utils/authError'

export const updateRoundInDb = async (roundData: RoundWithIdT) => {
  if (auth.currentUser === null) {
    return authError()
  }

  const roundDoc = doc(
    db,
    'users',
    auth.currentUser.uid,
    'rounds',
    roundData.id,
  )

  try {
    await runTransaction(db, async (transaction) => {
      transaction.update(roundDoc, {
        roundName: roundData.roundName,
        location: roundData.location,
        frequency: roundData.frequency,
      })

      // list of currrent related job to be removed
      const originalRelatedJobs = roundData.relatedJobs || []

      originalRelatedJobs.forEach((jobId) => {
        transaction.update(roundDoc, {
          relatedJobs: arrayRemove(jobId),
        })
      })

      //list of new related job to be added
      const newRelatedJobIds = roundData.relatedJobs
      if (!newRelatedJobIds) {
        throw new Error('No related jobs array provided')
      }

      newRelatedJobIds.forEach((jobId) => {
        transaction.update(roundDoc, {
          relatedJobs: arrayUnion(jobId),
        })
      })
    })

    const roundSnapshot = await getDoc(roundDoc)
    const updatedRound = roundSnapshot.data()

    return {
      success: true,
      status: 200,
      message: `Round id ${roundSnapshot.id} updated database`,
      data: {
        id: roundSnapshot.id,
        ...updatedRound,
      },
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: 'An error occurred while updating the round in the database',
    }
  }
}
