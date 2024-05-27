import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { RoundWithRelatedJobIdsT } from '../../types/RoundT'
import { splitStringToLowerCaseArray } from '../../utils/splitStringToLowerCaseArray'

export const updateRound = async (roundData: RoundWithRelatedJobIdsT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'addRound' })
  }

  try {
    const roundDoc = doc(
      db,
      'users',
      auth.currentUser.uid,
      'rounds',
      roundData.id,
    )

    await updateDoc(roundDoc, {
      roundName: roundData.roundName,
      location: roundData.location,
      frequency: roundData.frequency,
      relatedJobs: roundData.relatedJobs,
      _searchRoundName: splitStringToLowerCaseArray(roundData.roundName),
      _searchLocation: splitStringToLowerCaseArray(roundData.location),
      _searchFrequency: splitStringToLowerCaseArray(roundData.frequency),
    })

    const updatedRound = await getDoc(roundDoc)
    const updatedRoundData = updatedRound.data()

    return updatedRoundData
  } catch (error) {
    throw new Error(`Error updating round data at updateRound route: ${error}`)
  }
}
