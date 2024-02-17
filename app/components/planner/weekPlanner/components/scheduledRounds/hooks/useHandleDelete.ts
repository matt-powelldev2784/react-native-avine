import { removeScheduledRoundsFromDb } from '../../../../../../db/planner/removeScheduledRoundsFromDb'
import { getItemFromStorage } from '../../../../../../utils/getItemFromStorage'
import { addItemToStorage } from '../../../../../../utils/addItemToStorage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import { RoundWithRelatedJobsT } from '../../../../../../types/RoundT'

interface useHandleDeleteProps {
  setModalVisible: (modalVisible: boolean) => void
  round: RoundWithRelatedJobsT
}

const useHandleDelete = ({ setModalVisible, round }: useHandleDeleteProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { recurringRound } = round

  const handleDeletePress = async () => {
    if (recurringRound) {
      setModalVisible(true)
      return
    }

    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    await removeScheduledRoundsFromDb({
      roundId: round.id,
      date: currentPlannerDate,
      recurringEntry: false,
      singleEntry: true,
    })

    if (currentPlannerDate) {
      addItemToStorage('@newScheduledDate', currentPlannerDate)
    }

    navigation.navigate('Planner', { refresh: true })
  }

  const handleDeleteAllRecurringRounds = async () => {
    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    await removeScheduledRoundsFromDb({
      roundId: round.id,
      date: currentPlannerDate,
      recurringEntry: true,
      singleEntry: false,
    })

    if (currentPlannerDate) {
      addItemToStorage('@newScheduledDate', currentPlannerDate)
    }

    setModalVisible(false)
    navigation.navigate('Planner', { refresh: true })
  }

  const handleDeleteSingleRecurringRound = async () => {
    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    await removeScheduledRoundsFromDb({
      roundId: round.id,
      date: currentPlannerDate,
      recurringEntry: true,
      singleEntry: false,
      removeAllRecurringRounds: false,
    })

    if (currentPlannerDate) {
      addItemToStorage('@newScheduledDate', currentPlannerDate)
    }

    setModalVisible(false)
    navigation.navigate('Planner', { refresh: true })
  }

  return {
    handleDeletePress,
    handleDeleteAllRecurringRounds,
    handleDeleteSingleRecurringRound,
  }
}

export default useHandleDelete
