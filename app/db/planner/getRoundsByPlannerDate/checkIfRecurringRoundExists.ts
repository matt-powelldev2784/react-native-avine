import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { getRound } from '../../rounds/getRound'

interface planInfoT {
  roundId: string
}

export const checkIfRecurringRoundExists = async ({ roundId }: planInfoT) => {
  if (auth.currentUser === null) {
    return
  }

  try {
    //get round info
    const round = await getRound(roundId)
    if (!round) {
      return
    }

    // get recurring round doc ref
    const recurringRoundDoc = doc(
      db,
      'users',
      auth.currentUser.uid,
      'recurringRoundData',
      roundId,
    )
    const recurringRoundDocSnap = await getDoc(recurringRoundDoc)

    if (recurringRoundDocSnap.exists()) {
      console.log(`Recurring round ${roundId} already exists`)

      return {
        roundId: roundId,
        recurringRoundExists: true,
      }
    }
  } catch (error) {
    console.error('Error checking if recurring round exists', error)
  }
}
