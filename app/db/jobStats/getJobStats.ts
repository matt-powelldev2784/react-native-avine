import {
  doc,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { convertDbDateToDateString } from '../../utils/convertDbDateToDateString'

interface getJobstats {
  startDate: string
  endDate: string
}

export const getJobstats = async ({ startDate, endDate }: getJobstats) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getJobstats' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const plannerCollection = collection(userDoc, 'planner')

    // format dates
    const startDateObj = convertDbDateToDateString(startDate)
    const endDateObj = convertDbDateToDateString(endDate)
    const startTimestamp = new Timestamp(
      new Date(startDateObj).getTime() / 1000,
      0,
    )
    const endTimestamp = new Timestamp(new Date(endDateObj).getTime() / 1000, 0)

    //query planner documents
    const q = query(
      plannerCollection,
      where('_dateTimestamp', '>=', startTimestamp),
      where('_dateTimestamp', '<=', endTimestamp),
    )

    const querySnapshot = await getDocs(q)

    const plannerDocs = querySnapshot.docs.map((plannerDoc) => ({
      id: plannerDoc.id,
      ...plannerDoc.data(),
    }))

    console.log('plannerDocs', plannerDocs)

    return plannerDocs
  } catch (error) {
    throw new Error(`Error getting clients at getJobstats route: ${error}`)
  }
}
