import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../../screens/stackNavigator/StackNavigator'
import { RoundWithRecurringFlagT } from '../../../../../../types/RoundT'
import { deleteOneOffRound } from '../../../../../../db/planner/deleteRound/deleteOneOffRound'
import { deleteSingleRecurringRound } from '../../../../../../db/planner/deleteRound/deleteSingleRecurringRound'
import { deleteAllRecurringRounds } from '../../../../../../db/planner/deleteRound/deleteAllRecurrringRounds'
import { usePlannerContext } from '../../../../../../screens/planner/plannerContext/usePlannerContext'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'

interface useHandleDeleteProps {
  setRecurringModalVisible: (modalVisible: boolean) => void
  setOneOffModalVisible: (modalVisible: boolean) => void
  round: RoundWithRecurringFlagT
}

const useHandleDelete = ({
  setRecurringModalVisible,
  setOneOffModalVisible,
  round,
}: useHandleDeleteProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { recurringRound } = round
  const { selectedDay } = usePlannerContext()

  // *************************************************************************
  // handle initial delete press
  // if delette is pressed on a one off round immediate delete will occur
  const handleDeletePress = async () => {
    if (recurringRound) {
      setRecurringModalVisible(true)
      return
    }

    if (!recurringRound) {
      setOneOffModalVisible(true)
      return
    }
  }

  const handleDeleteOneOffRound = async () => {
    await deleteOneOffRound({
      roundId: `${round.id}`,
      date: formatDateForDb(selectedDay),
    })

    navigation.navigate('Planner', {
      displayScheduledRoundForm: false,
    })
  }

  // *************************************************************************
  // handle delete all recurring rounds
  const handleDeleteAllRecurringRounds = async () => {
    await deleteAllRecurringRounds({
      roundId: round.id,
    })

    navigation.navigate('Planner', {
      displayScheduledRoundForm: false,
    })
  }

  // *************************************************************************
  // handle delete single recurring round
  const handleDeleteSingleRecurringRound = async () => {
    await deleteSingleRecurringRound({
      roundId: round.id,
      date: formatDateForDb(selectedDay),
    })

    navigation.navigate('Planner', {
      displayScheduledRoundForm: false,
    })
  }

  return {
    handleDeletePress,
    handleDeleteOneOffRound,
    handleDeleteAllRecurringRounds,
    handleDeleteSingleRecurringRound,
  }
}

export default useHandleDelete
