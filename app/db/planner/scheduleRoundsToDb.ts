import { removeScheduledRoundsFromDb } from './removeScheduledRoundsFromDb'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { getRoundById } from '../rounds/getRoundById'
import { getRecurringDatesTwoYearsAhead } from '../../utils/getRecurringDates2YearsAhead'
import { scheduleRoundToDb } from './scheduleRoundtoDb'

interface planInfoT {
  roundId: string
  date: string
  recurring: boolean
}

export const scheduleRoundsToDb = async (planInfo: planInfoT) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    // if round is not recurring add single entry to to planner
    if (!planInfo.recurring) {
      await scheduleRoundToDb({
        roundId: planInfo.roundId,
        date: planInfo.date,
        recurringRound: false,
      })
      return
    }

    //get round info
    const round = await getRoundById(planInfo.roundId)
    if (!round) {
      return
    }

    // get recurring round doc ref
    const recurringRoundDoc = doc(
      db,
      'users',
      auth.currentUser.uid,
      'recurringRounds',
      planInfo.roundId,
    )

    //remove existing recurring round from db if it exists
    // users are only allowed one recurring entry per round
    const recurringRoundDocSnap = await getDoc(recurringRoundDoc)

    if (recurringRoundDocSnap.exists()) {
      await removeScheduledRoundsFromDb({
        date: planInfo.date,
        roundId: planInfo.roundId,
        singleEntry: false,
        recurringEntry: true,
      })
    }

    //add recurring round to recurringRounds collection
    const recurringDates = getRecurringDatesTwoYearsAhead(
      planInfo.date,
      round.frequency,
    )

    await setDoc(recurringRoundDoc, {
      roundId: planInfo.roundId,
      startDate: planInfo.date,
      frequency: round.frequency,
      recurringDates: recurringDates,
    })

    console.log('Recurring round info added to db:', planInfo.roundId)

    //add each recurring round to planner collection
    await Promise.all(
      recurringDates.map(async (date) => {
        if (auth.currentUser === null) {
          return
        }

        await scheduleRoundToDb({
          roundId: planInfo.roundId,
          date: date,
          recurringRound: true,
        })
      }),
    )

    console.log(
      `${planInfo.roundId} added to planner collection every ${round.frequency}`,
    )
  } catch (error) {
    console.error('Error adding recurring round on selected date', error)
  }
}
