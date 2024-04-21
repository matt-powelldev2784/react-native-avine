import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, auth, storage } from '../../../firebaseConfig'
import { authError } from '../authError'
import { doc, setDoc } from '@firebase/firestore'

export const uploadCompanyLogo = async (fileUri: string) => {
  if (!auth.currentUser) {
    return authError({ filename: 'uploadCompanyLogo' })
  }

  try {
    const response = await fetch(fileUri)
    const blob = await response.blob()
    const fileExtension = blob.type.split('/')[1]

    const storageRef = ref(
      storage,
      `images/${auth.currentUser.uid}/logo.${fileExtension}`,
    )
    const metadata = {
      contentType: blob.type,
    }

    // Upload the file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        throw new Error(`Error uploading file to Firebase Storage: ${error}`)
      },
      async () => {
        if (!auth.currentUser) {
          return authError({ filename: 'uploadCompanyLogo' })
        }

        // Upload completed successfully, get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available at', downloadURL)

        // Update the user's document with the logo URL
        const userDoc = doc(db, 'users', auth.currentUser.uid)
        await setDoc(userDoc, { logo: downloadURL }, { merge: true })

        return downloadURL
      },
    )
  } catch (error) {
    throw new Error(`Error in uploadCompanyLogo route: ${error}`)
  }
}
