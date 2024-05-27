import {
  doc,
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  getCountFromServer,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { DocumentSnapshot } from 'firebase/firestore'
import { RoundWithIdT } from '../../types/RoundT'

export const getAllRoundsWithLimit = async (
  lastVisibleDocument: DocumentSnapshot | null = null,
) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getAllRoundsWithLimit' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundsCollection = collection(userDoc, 'rounds')

    //get clients data
    let q
    if (lastVisibleDocument) {
      q = query(
        roundsCollection,
        where('isDeleted', '!=', true),
        orderBy('roundName'),
        startAfter(lastVisibleDocument),
        limit(10),
      )
    } else {
      q = query(
        roundsCollection,
        where('isDeleted', '!=', true),
        orderBy('roundName'),
        limit(10),
      )
    }

    const querySnapshot = await getDocs(q)

    const jobs = querySnapshot.docs.map((round) => ({
      id: round.id,
      ...round.data(),
    })) as RoundWithIdT[]

    const sortedRounds = jobs.sort((a, b) =>
      a.roundName.localeCompare(b.roundName),
    )

    // get document count
    const countQuery = query(
      roundsCollection,
      where('isDeleted', '!=', true),
      orderBy('roundName'),
    )
    const snapshot = await getCountFromServer(countQuery)
    const count = snapshot.data().count

    const data = {
      rounds: sortedRounds,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
      count,
    }

    return data
  } catch (error) {
    throw new Error(
      `Error getting clients at getAllRoundsWithLimit route: ${error}`,
    )
  }
}
