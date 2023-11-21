import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
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
        <View style={styles.nav}>
          <TouchableOpacity>
            <Text style={styles.navText}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Dashboard>
    </>
  )
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#59b6ef',
    width: '100%',
  },
  navText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default Customers
