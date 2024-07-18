import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'

export const addUserToDb = async () => {
  if (auth.currentUser === null) {
    return
  }

  const userDocRef = doc(db, 'users', auth.currentUser.uid)
  const userDocSnap = await getDoc(userDocRef)
  const userData = userDocSnap.data()

  if (
    !userData?.email ||
    !userData?.userId ||
    userData?.companyDetailsProvided === undefined
  ) {
    await setDoc(userDocRef, {
      email: auth.currentUser.email,
      userId: auth.currentUser.uid,
      companyDetailsProvided: false,
    })
  }
}
