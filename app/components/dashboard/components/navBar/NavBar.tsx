import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDeviceType } from '../../../../utils/hooks/useDeviceTypes'
import theme from '../../../../utils/theme/theme'
import useNavigationRouteFunctions from './hooks/useNavigationRouteFunctions'
import NavBarItem from './components/NavBarItem'

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
      gap: isLargeWeb ? 18 : 0,
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
      {isLargeWeb && (
        <>
          <NavBarItem
            buttonText="Home"
            imageSource={require('../../../../../assets/home.png')}
            routeFunction={routeFunctions.home}
          />
        </>
      )}

      <NavBarItem
        buttonText="Clients"
        imageSource={require('../../../../../assets/customers.png')}
        routeFunction={routeFunctions.clientsNaviagtion}
      />

      <NavBarItem
        buttonText="Jobs"
        imageSource={require('../../../../../assets/clipboard_tick.png')}
        routeFunction={routeFunctions.jobsNaviagtion}
      />

      <NavBarItem
        buttonText="Rounds"
        imageSource={require('../../../../../assets/round.png')}
        routeFunction={routeFunctions.roundsNavigation}
      />

      <NavBarItem
        buttonText="Planner"
        imageSource={require('../../../../../assets/calendar_white.png')}
        routeFunction={routeFunctions.plannerNavigation}
      />

      <NavBarItem
        buttonText="Invoices"
        imageSource={require('../../../../../assets/pay.png')}
        routeFunction={routeFunctions.invoicesNavigation}
      />

      {isLargeWeb && (
        <>
          <NavBarItem
            buttonText="Settings"
            imageSource={require('../../../../../assets/settings.png')}
            routeFunction={routeFunctions.signOut}
          />
        </>
      )}
    </SafeAreaView>
  )
}

export default NavBar
