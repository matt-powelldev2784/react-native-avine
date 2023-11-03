import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import PlanMeLogo from '../components/PlanMeLogo'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PlanMeLogo />
      <Text style={styles.text}>Quick and Simple Cleaning Planner</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: '#337bae',
  },
  image: {
    width: 300,
    height: 74,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
})

export default HomeScreen
