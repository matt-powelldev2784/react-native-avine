import { doc, collection, addDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { PlanT } from '../../types/PlanT'

export const scheduleRoundToDb = async (planInfo: PlanT) => {
  if (auth.currentUser === null) {
    return
  }

  console.log(' planInfo.roundId,', planInfo.roundId)

  try {
    const roundDoc = doc(
      db,
      'users',
      auth.currentUser.uid,
      'rounds',
      planInfo.roundId,
    )

    const scheduledDatesCollection = collection(roundDoc, 'scheduledDates')

    const newRoundRef = await addDoc(scheduledDatesCollection, {
      date: planInfo.date,
    })

    console.log('New round added with ID:', newRoundRef.id)

    return newRoundRef
  } catch (error) {
    console.error('Error adding round:', error)
  }
}
