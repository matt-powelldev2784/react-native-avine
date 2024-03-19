import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import theme from '../../../../utils/theme/theme'
import useNavigationRouteFunctions from './hooks/useNavigationRouteFunctions'
import NavBarItem from './components/NavBarItem'

const NavBar = () => {
  const { routeFunctions } = useNavigationRouteFunctions()

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.nav}>
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
    paddingTop: 9,
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
