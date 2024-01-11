import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { PlanT } from '../../types/PlanT'

export const scheduleRoundToDb = async (planInfo: PlanT) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    //add scheduled date to round document
    const roundDoc = doc(
      db,
      'users',
      auth.currentUser.uid,
      'rounds',
      planInfo.roundId,
    )

    await updateDoc(roundDoc, {
      scheduledDates: arrayUnion(planInfo.date),
    })

    //add scheduled date to related job document
    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'jobs'),
      where('linkedRounds', 'array-contains', planInfo.roundId),
    )

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (job) => {
      if (auth.currentUser === null) {
        return
      }

      const jobDoc = doc(db, 'users', auth.currentUser.uid, 'jobs', job.id)
      await updateDoc(jobDoc, {
        [`scheduledDatesInfo.${planInfo.date}`]: {
          date: planInfo.date,
          complete: false,
          paid: false,
        },
        scheduledDates: arrayUnion(planInfo.date),
      })
    })

    console.log('Date added to round document:', planInfo.date)
  } catch (error) {
    console.error('Error planning round on selected date', error)
  }
}
