import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'
import { authError } from '../authError'

export const getUser = async () => {
  if (!auth.currentUser) {
    return authError({ filename: 'getUser' })
  }

  try {
    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const docSnap = await getDoc(userDoc)

    if (docSnap.exists()) {
      const user = docSnap.data()
      return user
    }

    throw new Error('No user found in database')
  } catch (error) {
    throw new Error(`Error in getUser route: ${error}`)
  }
}
