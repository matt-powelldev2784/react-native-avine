import { Text } from 'react-native'
import React, { useEffect } from 'react'
import { Dashboard } from '../components'
import { doc, setDoc, getDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../firebaseConfig'

const Customers = () => {
  useEffect(() => {
    const addUser = async () => {
      if (auth.currentUser === null) {
        return
      }

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

    const addRound = async (roundData: any) => {
      if (auth.currentUser === null) {
        return
      }

      const userDoc = doc(db, 'users', auth.currentUser.uid)

      // Create a new round with auto-generated ID
      const roundCollection = collection(userDoc, 'rounds')
      const roundDoc = doc(roundCollection)

      await setDoc(roundDoc, roundData)

      console.log('New round added with ID:', roundDoc.id)
    }

    // Call the function to add a round

    addUser()
    addRound({
      roundId: 1, // This should be generated automatically or manually incremented
      name: 'Round Name',
      place: 'Place Name',
      numOfJobs: 5,
      roundTime: 12.34,
    })
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
