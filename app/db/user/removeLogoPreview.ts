import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const removeLogoPreview = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'removeLogoPreview' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(userDoc)

    if (docSnap.exists()) {
      docSnap.data().getLogoPreview = ''
      return { success: true, message: 'Logo preview removed successfully' }
    }

    throw new Error('No logo found for this user')
  } catch (error) {
    throw new Error(`Error in removeLogoPreview route: ${error}`)
  }
}
