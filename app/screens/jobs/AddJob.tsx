import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddJobForm } from '../../components'

const AddJob = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AddJobForm />
    </SafeAreaView>
  )
}

export default AddJob

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
})
