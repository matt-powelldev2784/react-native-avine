import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDeviceType } from '../../../../utils/deviceTypes'
import theme from '../../../../utils/theme/theme'
import useNavigationRouteFunctions from './hooks/useNavigationRouteFunctions'
import NavBarWebItem from './components/NavBarWebItem'

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
      gap: isLargeWeb ? 4 : 0,
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
      <NavBarWebItem
        buttonText="CLIENTS"
        imageSource={require('../../../../../assets/customers.png')}
        routeFunction={routeFunctions.clientsNaviagtion}
      />

      <NavBarWebItem
        buttonText="JOBS"
        imageSource={require('../../../../../assets/clipboard_tick.png')}
        routeFunction={routeFunctions.jobsNaviagtion}
      />

      <NavBarWebItem
        buttonText="ROUNDS"
        imageSource={require('../../../../../assets/round.png')}
        routeFunction={routeFunctions.roundsNavigation}
      />

      <NavBarWebItem
        buttonText="PLANNNER"
        imageSource={require('../../../../../assets/calendar_white.png')}
        routeFunction={routeFunctions.plannerNavigation}
      />

      <NavBarWebItem
        buttonText="INVOICES"
        imageSource={require('../../../../../assets/pay.png')}
        routeFunction={routeFunctions.plannerNavigation}
      />

      {isLargeWeb && (
        <>
          <NavBarWebItem
            buttonText="SETTINGS"
            imageSource={require('../../../../../assets/settings.png')}
            routeFunction={routeFunctions.signOut}
          />
        </>
      )}
    </SafeAreaView>
  )
}

export default NavBar
