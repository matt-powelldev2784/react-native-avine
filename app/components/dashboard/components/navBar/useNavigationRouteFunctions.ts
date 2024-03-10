import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

const useNavigationRouteFunctions = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const routeFunctions = {
    clientsNaviagtion: () => navigation.navigate('Clients', { refresh: true }),
    jobsNaviagtion: () => navigation.navigate('Jobs', { refresh: true }),
    roundsNavigation: () => navigation.navigate('Rounds', { refresh: true }),
    plannerNavigation: () =>
      navigation.navigate('Planner', {
        displayScheduledRoundForm: false,
        refresh: true,
      }),
    signOut: () => {
      navigation.navigate('SignOut')
    },
  }

  return { routeFunctions }
}

export default useNavigationRouteFunctions
