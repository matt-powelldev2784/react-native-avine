import { getItemFromStorage } from '../../../../../../utils/getItemFromStorage'
import { addItemToStorage } from '../../../../../../utils/addItemToStorage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import { RoundWithRecurringFlagT } from '../../../../../../types/RoundT'
import { deleteOneOffRound } from '../../../../../../db/planner/deleteRound/deleteOneOffRound'
import { deleteSingleRecurringRound } from '../../../../../../db/planner/deleteRound/deleteSingleRecurringRound'
import { deleteAllRecurringRounds } from '../../../../../../db/planner/deleteRound/deleteAllRecurrringRounds'

interface useHandleDeleteProps {
  setModalVisible: (modalVisible: boolean) => void
  round: RoundWithRecurringFlagT
}

const useHandleDelete = ({ setModalVisible, round }: useHandleDeleteProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { recurringRound } = round

  // *************************************************************************
  // handle initial delete press
  // if delette is pressed on a one off round immediate delete will occur
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

    if (currentPlannerDate) {
      addItemToStorage('@newScheduledDate', currentPlannerDate)
    }

    navigation.navigate('Planner', { refresh: true })
  }

  // *************************************************************************
  // handle delete all recurring rounds
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

  // *************************************************************************
  // handle delete single recurring round
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
