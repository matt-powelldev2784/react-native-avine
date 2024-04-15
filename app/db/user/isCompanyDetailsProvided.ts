import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const isCompanyDetailsProvided = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'isCompanyDetailsProvided' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(userDoc)

    if (docSnap.exists()) {
      const companyDetailsAdded = docSnap.data().companyDetailsProvided
      return companyDetailsAdded
    }

    throw new Error('No companyDetailsProvided field for this user')
  } catch (error) {
    throw new Error(`Error in isCompanyDetailsProvided route: ${error}`)
  }
}
