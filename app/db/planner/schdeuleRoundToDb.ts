import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { PlanT } from '../../types/PlanT'

export const scheduleRoundToDb = async (planInfo: PlanT) => {
  if (auth.currentUser === null) {
    return
  }

  try {
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

    console.log('Date added to round document:', planInfo.date)
  } catch (error) {
    console.error('Error adding date to round:', error)
  }
}
