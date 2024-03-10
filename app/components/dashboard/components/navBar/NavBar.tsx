import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDeviceType } from '../../../../utils/deviceTypes'
import theme from '../../../../utils/theme/theme'
import useNavigationRouteFunctions from './useNavigationRouteFunctions'

const NavBar = () => {
  const { routeFunctions } = useNavigationRouteFunctions()
  const { isLargeWeb } = useDeviceType()

  const styles = StyleSheet.create({
    nav: {
      position: isLargeWeb ? 'relative' : ('fixed' as any),
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.primary,
      gap: isLargeWeb ? 32 : 0,
      paddingTop: 8,
      paddingBottom: 6,
      width: isLargeWeb ? 'auto' : '100%',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      width: 80,
    },
    buttonText: {
      paddingTop: 2,
      color: 'white',
      fontSize: isLargeWeb ? 14 : 12,
    },
  })

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.nav}>
      <TouchableOpacity
        style={styles.button}
        onPress={routeFunctions.jobsNaviagtion}
      >
        <Image
          source={require('../../../../../assets/customers.png')}
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

      {isLargeWeb && (
        <TouchableOpacity
          style={styles.button}
          onPress={routeFunctions.signOut}
        >
          <Image
            source={require('../../../../../assets/settings.png')}
            style={{ width: 25, height: 25 }}
          />
          <Text style={styles.buttonText}>SETTINGS</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

export default NavBar
