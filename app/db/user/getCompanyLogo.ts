import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const getCompanyLogo = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'getCompanyLogo' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(userDoc)

    if (docSnap.exists()) {
      const downloadURL = docSnap.data().logoUrl
      console.log('File available at', downloadURL)
      return downloadURL
    }

    throw new Error('No logo found for this user')
  } catch (error) {
    throw new Error(`Error in getCompanyLogo route: ${error}`)
  }
}
