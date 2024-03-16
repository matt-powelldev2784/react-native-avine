import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import theme from '../../../../utils/theme/theme'
import useNavigationRouteFunctions from './hooks/useNavigationRouteFunctions'

const NavBar = () => {
  const { routeFunctions } = useNavigationRouteFunctions()

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.nav}>
      <TouchableOpacity
        style={styles.button}
        onPress={routeFunctions.clientsNaviagtion}
      >
        <Image
          source={require('../../../../../assets/customers.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>CLIENTS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={routeFunctions.jobsNaviagtion}
      >
        <Image
          source={require('../../../../../assets/clipboard_tick.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>JOBS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={routeFunctions.roundsNavigation}
      >
        <Image
          source={require('../../../../../assets/round.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>ROUNDS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={routeFunctions.plannerNavigation}
      >
        <Image
          source={require('../../../../../assets/calendar_white.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.buttonText}>PLANNER</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute' as any,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.primary,
    paddingTop: 8,
    paddingBottom: 6,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 80,
  },
  buttonText: {
    marginTop: 2,
    color: 'white',
    fontSize: 12,
  },
})

export default NavBar
