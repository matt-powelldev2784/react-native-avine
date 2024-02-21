import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  arrayRemove,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { getRoundById } from '../rounds/getRoundById'
interface scheduleRoundToDbT {
  roundId: string
  date: string
  recurringRound: boolean
}

export const scheduleRoundToDb = async (planInfo: scheduleRoundToDbT) => {
  if (auth.currentUser === null) {
    return
  }

  const { recurringRound, roundId, date } = planInfo

  const plannerDocRef = doc(db, 'users', auth.currentUser.uid, 'planner', date)

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
        recurringRounds: arrayRemove(planInfo.roundId),
      })

      //logic to remove recurring round date from recurring round collection if it exists
      //one off round will overwrite a recurring round if it exists
      const recurringRoundDocRef = doc(
        db,
        'users',
        auth.currentUser.uid,
        'recurringRounds',
        planInfo.roundId,
      )

      const recurringRoundDoc = await getDoc(recurringRoundDocRef)
      if (!recurringRoundDoc.exists()) {
        console.log('No recurring round found')
      }

      const recurringRoundData = recurringRoundDoc.data()
      if (recurringRoundData?.recurringDates) {
        await updateDoc(recurringRoundDocRef, {
          recurringDates: recurringRoundData.recurringDates.filter(
            (recurringDate: string) => recurringDate !== planInfo.date,
          ),
        })
      }
    }

    if (recurringRound) {
      await updateDoc(plannerDocRef, {
        recurringRounds: arrayUnion(planInfo.roundId),
        relatedRounds: arrayRemove(planInfo.roundId),
      })
    }

    //add each related to job to planner document
    const round = await getRoundById(roundId)
    const relatedJobs = round?.relatedJobs || []

    await Promise.all(
      relatedJobs.map(async (jobId) => {
        if (auth.currentUser === null) {
          return
        }

        await updateDoc(plannerDocRef, {
          relatedJobs: arrayUnion(`${roundId}/${jobId}`),
        })
      }),
    )

    console.log(`Scheduled round ${planInfo.roundId} to db on ${planInfo.date}`)
  } catch (error) {
    console.error('Error scheduling round on selected date', error)
  }
}
