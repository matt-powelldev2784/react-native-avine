import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const removeLogoPreview = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'removeLogoPreview' })
  }

  try {
    const userDocRef = doc(db, 'users', auth.currentUser.uid)

    if (userDocRef) {
      await updateDoc(userDocRef, { logoPreview: '' })
      return { success: true, message: 'Logo preview removed successfully' }
    }

    throw new Error('No logo found for this user')
  } catch (error) {
    throw new Error(`Error in removeLogoPreview route: ${error}`)
  }
}
