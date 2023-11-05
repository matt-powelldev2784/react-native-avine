import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { ReactNode } from 'react'
import PlanMeLogo from '../components/PlanMeLogo/PlanMeLogo'
import NavBar from '../components/navBar/NavBar'

interface DashboardProps {
  Children?: ReactNode
}

const Dashboard = ({ Children }: DashboardProps) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logoBackground}>
        {Platform.OS === 'web' ? (
          <PlanMeLogo width={200} height={50} />
        ) : (
          <PlanMeLogo width={150} height={40} />
        )}
        {Platform.OS === 'web' ? <NavBar /> : null}
      </View>

      <View style={styles.page}>
        <Text style={styles.text}>Quick and Simple Round Planner</Text>
      </View>

      {Children}

      {Platform.OS !== 'web' ? <NavBar /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
    backgroundColor: '#337bae',
  },
  logoBackground: {
    backgroundColor: '#337bae',
    paddingHorizontal: Platform.OS === 'web' ? 12 : 0,
    flexDirection: 'row',
    justifyContent: Platform.OS === 'web' ? 'space-between' : 'center',
    width: '100%',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 32,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    width: '100%',
  },
  text: {
    color: '#337bae',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
})

export default Dashboard
