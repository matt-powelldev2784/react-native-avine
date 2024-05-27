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
import { JobWithIdT } from '../../types/JobT'

interface SearchClientsT {
  searchField: string
  searchTerm: string
  lastVisible: DocumentSnapshot | null
}

export const searchJobs = async ({
  searchField,
  searchTerm,
  lastVisible = null,
}: SearchClientsT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'searchJobs' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const jobsCollection = collection(userDoc, 'jobs')
    const searchTerms = splitStringToLowerCaseArray(searchTerm)

    //get clients data
    let q
    if (lastVisible) {
      q = query(
        jobsCollection,
        where(searchField, 'array-contains-any', searchTerms),
        where('isDeleted', '!=', true),
        orderBy('jobName'),
        startAfter(lastVisible),
        limit(10),
      )
    } else {
      q = query(
        jobsCollection,
        where(searchField, 'array-contains-any', searchTerms),
        where('isDeleted', '!=', true),
        orderBy('jobName'),
        limit(10),
      )
    }

    const querySnapshot = await getDocs(q)

    const jobs = querySnapshot.docs.map((job) => ({
      id: job.id,
      ...job.data(),
    })) as JobWithIdT[]

    const sortedJobs = jobs.sort((a, b) => a.jobName.localeCompare(b.jobName))

    // get document count
    const countQuery = query(
      jobsCollection,
      where(searchField, 'array-contains-any', searchTerms),
      where('isDeleted', '!=', true),
      orderBy('jobName'),
    )
    const snapshot = await getCountFromServer(countQuery)
    const count = snapshot.data().count

    const data = {
      jobs: sortedJobs,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
      count,
    }

    return data
  } catch (error) {
    throw new Error(`Error getting clients at searchJobs route: ${error}`)
  }
}
