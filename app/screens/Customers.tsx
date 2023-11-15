import { Text } from 'react-native'
import React, { useEffect } from 'react'
import { Dashboard } from '../components'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'

const Customers = () => {
  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser === null) return
      const userDoc = doc(db, 'users', auth.currentUser.uid)
      await setDoc(userDoc, {
        email: auth.currentUser.email,
        userId: auth.currentUser.uid,
      })

      // Fetch the document
      const docSnap = await getDoc(userDoc)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
      } else {
        console.log('No such document!')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Dashboard>
        <Text>Customers</Text>
      </Dashboard>
    </>
  )
}

export default Customers
