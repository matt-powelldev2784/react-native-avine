import { doc, collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

interface getJobstats {
  startDate?: string
  endDate?: string
}

export const getJobstats = async ({ startDate, endDate }: getJobstats) => {
  if (!auth.currentUser) {
    return authError({ filename: 'getJobstats' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const plannerCollection = collection(userDoc, 'planner')

    const q = query(plannerCollection)

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
