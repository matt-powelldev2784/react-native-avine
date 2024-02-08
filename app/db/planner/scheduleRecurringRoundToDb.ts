import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { PlanT } from '../../types/PlanT'
import { getRoundById } from '../rounds/getRoundById'
import { getRecurringDatesTwoYearsAhead } from '../../utils/getRecurringDates2YearsAhead'

export const scheduleRecurringRoundToDb = async (planInfo: PlanT) => {
  if (auth.currentUser === null) {
    return
  }

  if (!planInfo.recurring) {
    return
  }

  try {
    //add recurring round to recurringRounds collection
    const round = await getRoundById(planInfo.roundId)
    if (!round) {
      return
    }

    const recurringRoundDoc = doc(
      db,
      'users',
      auth.currentUser.uid,
      'recurringRounds',
      planInfo?.roundId,
    )

    const recurringDates = getRecurringDatesTwoYearsAhead(
      planInfo.date,
      round.frequency,
    )

    await setDoc(recurringRoundDoc, {
      roundId: planInfo.roundId,
      startDate: planInfo.date,
      frequency: round?.frequency,
      recurrringDates: recurringDates,
    })

    console.log('Recurring round added to db:', planInfo.roundId)

    // await Promise.all(
    //   querySnapshot.docs.map(async (job) => {
    //     if (auth.currentUser === null) {
    //       return
    //     }

    //     await updateDoc(plannerDocRef, {
    //       relatedJobs: arrayUnion(job.id),
    //     })
    //   }),
    // )
  } catch (error) {
    console.error('Erroradd recurring round on selected date', error)
  }
}
