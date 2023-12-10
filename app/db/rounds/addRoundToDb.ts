import {
  doc,
  setDoc,
  getDoc,
  collection,
  updateDoc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { RoundWithJobsT } from '../../../types/RoundT'

export const addRoundToDb = async (roundData: RoundWithJobsT) => {
  if (auth.currentUser === null) {
    return
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const roundsCollection = collection(userDoc, 'rounds')
  const roundDoc = doc(roundsCollection)

  try {
    await setDoc(roundDoc, {
      roundName: roundData.roundName,
      location: roundData.location,
      frequency: roundData.frequency,
    })

    const linkedJobIds = roundData.jobs

    //add round id to each job to provide relationship
    for (const jobId of linkedJobIds) {
      const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)
      await updateDoc(jobDocRef, {
        linkedRounds: arrayUnion(roundDoc.id),
      })
    }

    console.log('New round added with ID:', roundDoc.id)

    const roundSnapshot = await getDoc(roundDoc)
    const round = roundSnapshot.data()

    return round
  } catch (error) {
    if (roundDoc) {
      await deleteDoc(roundDoc)
      console.log('Round document deleted due to an error:', roundDoc.id)
    }

    //remove round id from each job to remove relationship
    const linkedJobIds = roundData.jobs
    for (const jobId of linkedJobIds) {
      const jobDocRef = doc(db, 'users', auth.currentUser.uid, 'jobs', jobId)
      if (jobDocRef) {
        await updateDoc(jobDocRef, {
          linkedRounds: arrayRemove(roundDoc.id),
        })
      }
    }
    console.error('Error adding round:', error)
  }
}
