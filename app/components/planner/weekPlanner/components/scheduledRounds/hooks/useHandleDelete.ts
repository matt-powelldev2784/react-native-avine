import { RoundWithRecurringFlagT } from '../../../../../../types/RoundT'
import { deleteOneOffRound } from '../../../../../../db/planner/deleteRound/deleteOneOffRound'
import { deleteSingleRecurringRound } from '../../../../../../db/planner/deleteRound/deleteSingleRecurringRound'
import { deleteAllRecurringRounds } from '../../../../../../db/planner/deleteRound/deleteAllRecurrringRounds'
import { usePlannerContext } from '../../../../../../screens/planner/plannerContext/usePlannerContext'
import { formatDateForDb } from '../../../../../../utils/formatDateForDb'
import usePostApiData from '../../../../../../utils/hooks/usePostApiData'

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
  const { recurringRound } = round
  const { selectedDay } = usePlannerContext()
  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Planner',
    refreshScreen: { displayScheduledRoundForm: false, refresh: true },
  })

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
    setApiFunction(() => async () => {
      await deleteOneOffRound({
        roundId: `${round.id}`,
        date: formatDateForDb(selectedDay),
      })
    })
  }

  // *************************************************************************
  // handle delete all recurring rounds
  const handleDeleteAllRecurringRounds = async () => {
    setApiFunction(() => async () => {
      await deleteAllRecurringRounds({
        roundId: round.id,
      })
    })
  }

  // *************************************************************************
  // handle delete single recurring round
  const handleDeleteSingleRecurringRound = async () => {
    setApiFunction(() => async () => {
      await deleteSingleRecurringRound({
        roundId: round.id,
        date: formatDateForDb(selectedDay),
      })
    })
  }

  return {
    handleDeletePress,
    handleDeleteOneOffRound,
    handleDeleteAllRecurringRounds,
    handleDeleteSingleRecurringRound,
    postApiIsLoading,
  }
}

export default useHandleDelete
