import { getItemFromStorage } from '../../../../../../utils/getItemFromStorage'
import { addItemToStorage } from '../../../../../../utils/addItemToStorage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import { RoundWithRelatedJobsT } from '../../../../../../types/RoundT'
import { deleteOneOffRound } from '../../../../../../db/planner/deleteRound/deleteOneOffRound'
import { deleteSingleRecurringRound } from '../../../../../../db/planner/deleteRound/deleteSingleRecurringRound'
import { deleteAllRecurringRounds } from '../../../../../../db/planner/deleteRound/deleteAllRecurrringRounds'


interface RoundT extends RoundWithRelatedJobsT {
  recurringRound: boolean
}
interface useHandleDeleteProps {
  setModalVisible: (modalVisible: boolean) => void
  round: RoundT
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

    await deleteOneOffRound({
      roundId: `${round.id}`,
      date: currentPlannerDate,
    })

    console.log('`${round.id}@oneOffRound`', `${round.id}@oneOffRound`)
    console.log('round', round)
    console.log('delete one off')

    if (currentPlannerDate) {
      addItemToStorage('@newScheduledDate', currentPlannerDate)
    }

    navigation.navigate('Planner', { refresh: true })
  }

  const handleDeleteAllRecurringRounds = async () => {
    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    await deleteAllRecurringRounds({
      roundId: round.id,
    })

    if (currentPlannerDate) {
      addItemToStorage('@newScheduledDate', currentPlannerDate)
    }

    setModalVisible(false)
    navigation.navigate('Planner', { refresh: true })
  }

  const handleDeleteSingleRecurringRound = async () => {
    const currentPlannerDate = await getItemFromStorage('@plannerDate')

    await deleteSingleRecurringRound({
      roundId: round.id,
      date: currentPlannerDate,
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
