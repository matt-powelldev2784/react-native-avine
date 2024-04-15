import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'
import { doc, setDoc } from '@firebase/firestore'
import { CompanyT } from '../../types/CompanyT'

export const addCompanyDetails = async (companyDetails: CompanyT) => {
  if (!auth.currentUser) {
    return authError({ filename: 'addCompanyDetails' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    await setDoc(userDoc, companyDetails, { merge: true })

    return companyDetails
  } catch (error) {
    throw new Error(`Error in addCompanyDetails route: ${error}`)
  }
}
