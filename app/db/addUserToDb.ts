import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../firebaseConfig'

export const addUserToDb = async () => {
  if (auth.currentUser === null) {
    return
  }

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const docSnap = await getDoc(userDoc)
  console.log('docSnap', docSnap)

  if (!docSnap.exists()) {
    await setDoc(userDoc, {
      email: auth.currentUser.email,
      userId: auth.currentUser.uid,
    })
  }
}
