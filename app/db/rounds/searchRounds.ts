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
import { splitStringToLowerCaseArray } from '../../utils/splitStringToLowerCaseArray'
import { RoundWithIdT } from '../../types/RoundT'

interface SearchRoundsT {
  searchField: string
  searchTerm: string
  lastVisible: DocumentSnapshot | null
}

export const searchRounds = async ({
  searchField,
  searchTerm,
  lastVisible = null,
}: SearchRoundsT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'searchRounds' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const roundsCollection = collection(userDoc, 'rounds')
    const searchTerms = splitStringToLowerCaseArray(searchTerm)

    //get clients data
    let q
    if (lastVisible) {
      q = query(
        roundsCollection,
        where(searchField, 'array-contains-any', searchTerms),
        where('isDeleted', '!=', true),
        orderBy('roundName'),
        startAfter(lastVisible),
        limit(10),
      )
    } else {
      q = query(
        roundsCollection,
        where(searchField, 'array-contains-any', searchTerms),
        where('isDeleted', '!=', true),
        orderBy('roundName'),
        limit(10),
      )
    }

    const querySnapshot = await getDocs(q)

    const rounds = querySnapshot.docs.map((round) => ({
      id: round.id,
      ...round.data(),
    })) as RoundWithIdT[]

    const sortedRounds = rounds.sort((a, b) =>
      a.roundName.localeCompare(b.roundName),
    )

    // get document count
    const countQuery = query(
      roundsCollection,
      where(searchField, 'array-contains-any', searchTerms),
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
    throw new Error(`Error getting clients at searchRounds route: ${error}`)
  }
}
