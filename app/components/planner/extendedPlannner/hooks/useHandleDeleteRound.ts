import { RoundWithRecurringFlagT } from '../../../../types/RoundT'
import { deleteOneOffRound } from '../../../../db/planner/deleteRound/deleteOneOffRound'
import { deleteSingleRecurringRound } from '../../../../db/planner/deleteRound/deleteSingleRecurringRound'
import { deleteAllRecurringRounds } from '../../../../db/planner/deleteRound/deleteAllRecurrringRounds'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'

interface useHandleDeleteProps {
  setRecurringModalVisible: (modalVisible: boolean) => void
  setOneOffModalVisible: (modalVisible: boolean) => void
  round: RoundWithRecurringFlagT
  plannerDate: string
}

const useHandleDelete = ({
  setRecurringModalVisible,
  setOneOffModalVisible,
  round,
  plannerDate,
}: useHandleDeleteProps) => {
  const { recurringRound } = round
  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Planner',
    refreshScreen: {
      screen: 'ExtendedPlannerView',
    },
  })
  const { setPlannerNeedsUpdate } = usePlannerContext()

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
    console.log('round.id', round.id)
    setApiFunction(() => async () => {
      await deleteOneOffRound({
        roundId: `${round.id}`,
        date: plannerDate,
      })
    })
    setPlannerNeedsUpdate(true)
  }

  // *************************************************************************
  // handle delete all recurring rounds
  const handleDeleteAllRecurringRounds = async () => {
    setApiFunction(() => async () => {
      await deleteAllRecurringRounds({
        roundId: round.id,
      })
    })
    setPlannerNeedsUpdate(true)
  }

  // *************************************************************************
  // handle delete single recurring round
  const handleDeleteSingleRecurringRound = async () => {
    setApiFunction(() => async () => {
      await deleteSingleRecurringRound({
        roundId: round.id,
        date: plannerDate,
      })
    })
    setPlannerNeedsUpdate(true)
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
