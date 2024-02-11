import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
interface scheduleRoundToDbT {
  roundId: string
  date: string
  recurringRound: boolean
}

export const scheduleRoundToDb = async (planInfo: scheduleRoundToDbT) => {
  if (auth.currentUser === null) {
    return
  }

  const { recurringRound } = planInfo

  const plannerDocRef = doc(
    db,
    'users',
    auth.currentUser.uid,
    'planner',
    planInfo.date,
  )

  try {
    //add scheduled round to planner document
    let plannerDoc = await getDoc(plannerDocRef)

    if (!plannerDoc.exists()) {
      await setDoc(plannerDocRef, {
        relatedRounds: [],
        relatedJobs: [],
        completedJobs: [],
        recurringRounds: [],
      })
      plannerDoc = await getDoc(plannerDocRef)
    }

    if (!plannerDoc.exists()) {
      throw Error('Error creating planner doc')
    }

    if (!recurringRound) {
      await updateDoc(plannerDocRef, {
        relatedRounds: arrayUnion(planInfo.roundId),
      })
    }

    if (recurringRound) {
      await updateDoc(plannerDocRef, {
        recurringRounds: arrayUnion(planInfo.roundId),
      })
    }

    //add each related to job to planner document
    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'jobs'),
      where('linkedRounds', 'array-contains', planInfo.roundId),
    )

    const querySnapshot = await getDocs(q)

    await Promise.all(
      querySnapshot.docs.map(async (job) => {
        if (auth.currentUser === null) {
          return
        }

        await updateDoc(plannerDocRef, {
          relatedJobs: arrayUnion(job.id),
        })
      }),
    )

    console.log('Schedule round to db:', planInfo.date)
  } catch (error) {
    console.error('Error scheduling round on selected date', error)
  }
}
