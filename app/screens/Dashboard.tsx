import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import PlanMeLogo from '../components/PlanMeLogo'

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logoBackground}>
        <PlanMeLogo width={150} height={40} />
      </View>
      <View style={styles.page}>
        <Text style={styles.text}>Quick and Simple Round Planner</Text>
      </View>
      <View style={styles.nav}>
        <Image
          source={require('../../assets/customers.png')}
          style={{ width: 40, height: 40 }}
        />
        <Image
          source={require('../../assets/round.png')}
          style={{ width: 40, height: 40 }}
        />
        <Image
          source={require('../../assets/pay.png')}
          style={{ width: 40, height: 40 }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#337bae',
  },
  logoBackground: {
    backgroundColor: '#337bae',
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
