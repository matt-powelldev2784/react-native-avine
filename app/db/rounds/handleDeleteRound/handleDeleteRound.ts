import { authError } from './../../authError'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../../firebaseConfig'
import { removeRelatedRoundsIdFromDb } from './removeRelatedRoundsIdFromDb/removeRelatedRoundsIdFromDb'

export const handleDeleteRound = async (roundId: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'handleDeleteRound' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundDocRef = doc(userDoc, 'rounds', roundId)

    const removeRelatedRoundsIdFromDbsSuccess =
      await removeRelatedRoundsIdFromDb(roundId)

    if (!removeRelatedRoundsIdFromDbsSuccess.isDeleted) {
      throw new Error(
        `Error removing related rounds from db at handleDeleteRound route`,
      )
    }

    await updateDoc(roundDocRef, { isDeleted: true })

    return { message: `Round with id ${roundId} deleted`, isDeleted: true }
  } catch (error) {
    throw new Error(
      `Error deleteting round from db at handleDeleteRound route: ${error}`,
    )
  }
}
