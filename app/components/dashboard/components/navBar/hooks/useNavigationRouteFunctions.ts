import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../screens/stackNavigator/StackNavigator'

const useNavigationRouteFunctions = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const routeFunctions = {
    home: () => navigation.navigate('Home'),
    clientsNaviagtion: () => navigation.navigate('ClientMenu'),
    jobsNaviagtion: () => navigation.navigate('JobsMenu'),
    roundsNavigation: () => navigation.navigate('RoundMenu'),
    plannerNavigation: () =>
      navigation.navigate('Planner', {
        screen: 'PlannerView',
      }),
    invoicesNavigation: () =>
      navigation.navigate('InvoiceListView', { refresh: true }),
    signOut: () => {
      navigation.navigate('SignOut')
    },
  }

  return { routeFunctions }
}

export default useNavigationRouteFunctions
