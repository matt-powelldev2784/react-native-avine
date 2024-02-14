import { getItemFromStorage } from '../../../../../../utils/getItemFromStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import { useWeekPlanner } from '../../../hooks/WeekPlannerContext'

export const useRefreshPlannerAfterDelete = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { setRefreshData } = useWeekPlanner()

  const refreshPlannerAfterDelete = async () => {
    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    if (currentPlannerDate) {
      AsyncStorage.setItem(
        '@newScheduledDate',
        JSON.stringify(currentPlannerDate),
      )
    }

    setRefreshData(true)
    navigation.navigate('Planner', { refresh: true })
  }

  return refreshPlannerAfterDelete
}
