import { useState } from 'react'
import { addOneOffRound } from '../../../../db/planner/addRound/addOneOffRound'
import { deleteOneOffRound } from '../../../../db/planner/deleteRound/deleteOneOffRound'
import { deleteSingleRecurringRound } from '../../../../db/planner/deleteRound/deleteSingleRecurringRound'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { formatDateForDb } from '../../../../utils/formatDateForDb'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export const useMoveRound = () => {
  const [moveRoundIsLoading, setMoveRoundIsLoading] = useState<boolean>(false)
  const [moveRoundIsError, setMoveRoundIsError] = useState<boolean>(true)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const {
    selectedRound,
    highlightedDay,
    setPlannerNeedsUpdate,
    setMoveRoundState,
  } = usePlannerContext()

  const handleMoveRound = async () => {
    try {
      setMoveRoundIsError(false)
      setMoveRoundIsLoading(true)

      if (!selectedRound) return
      if (!highlightedDay) return

      if (selectedRound.recurringRound === false) {
        await deleteOneOffRound({
          date: selectedRound.plannerDate,
          roundId: selectedRound.roundId,
        })
      }

      if (selectedRound.recurringRound === true) {
        await deleteSingleRecurringRound({
          date: selectedRound.plannerDate,
          roundId: selectedRound.roundId,
        })
      }

      await addOneOffRound({
        date: formatDateForDb(highlightedDay),
        roundId: selectedRound.roundId,
        recurringRound: false,
      })

      navigation.navigate('Planner', {
        screen: 'ExtendedPlannerView',
        date: highlightedDay,
      })
    } catch (error) {
      console.error('Error moving round at useMoveRound.ts', error)
      navigation.navigate('Error')
    } finally {
      setMoveRoundIsLoading(false)
      setMoveRoundIsError(false)
      setPlannerNeedsUpdate(true)
      setMoveRoundState(false)
    }
  }

  return { moveRoundIsLoading, moveRoundIsError, handleMoveRound }
}
