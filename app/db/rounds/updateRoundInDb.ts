import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundWithJobIdsT } from '../../../types/RoundT'

interface roundData extends RoundWithJobIdsT {
  currentRelatedJobs: string[]
}

export const updateRoundInDb = async (roundData: roundData) => {
  if (auth.currentUser === null) {
    return
  }

  const roundDoc = doc(
    db,
    'users',
    auth.currentUser.uid,
    'rounds',
    roundData.id,
  )

  try {
    await updateDoc(roundDoc, {
      roundName: roundData.roundName,
      location: roundData.location,
      frequency: roundData.frequency,
    })

    const originalLinkedJobIds = roundData.currentRelatedJobs
    console.log('originalLinkedJobIds', originalLinkedJobIds)

    //remove round id from each related job to remove relationships
    if (originalLinkedJobIds) {
      for (const jobId of originalLinkedJobIds) {
        const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)
        await updateDoc(jobDocRef, {
          linkedRounds: arrayRemove(roundDoc.id),
        })
      }
    }

    const newLinkedJobIds = roundData.jobs

    // add round id to each related job to create relationship
    if (newLinkedJobIds) {
      for (const jobId of newLinkedJobIds) {
        const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)
        await updateDoc(jobDocRef, {
          linkedRounds: arrayUnion(roundDoc.id),
        })
      }
    }

    const roundSnapshot = await getDoc(roundDoc)
    const updatedRound = roundSnapshot.data()

    console.log('Round sucessfully updated:', updatedRound)

    return updatedRound
  } catch (error) {
    //remove round id from each job to remove relationship
    const newLinkedJobIds = roundData.jobs

    // remove new created relationships
    if (newLinkedJobIds) {
      for (const jobId of newLinkedJobIds) {
        const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)
        await updateDoc(jobDocRef, {
          linkedRounds: arrayRemove(roundDoc.id),
        })
      }
    }

    const originalLinkedJobIds = roundData.currentRelatedJobs

    //restore oringal relationships
    if (originalLinkedJobIds) {
      for (const jobId of originalLinkedJobIds) {
        const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)
        await updateDoc(jobDocRef, {
          linkedRounds: arrayUnion(roundDoc.id),
        })
      }
    }

    console.error('Error adding round:', error)
  }
}
