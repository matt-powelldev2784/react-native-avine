import { useState } from 'react'
import { addOneOffRound } from '../../../../db/planner/addRound/addOneOffRound'
import { deleteOneOffRound } from '../../../../db/planner/deleteRound/deleteOneOffRound'
import { deleteSingleRecurringRound } from '../../../../db/planner/deleteRound/deleteSingleRecurringRound'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { formatDateForDb } from '../../../../utils/formatDateForDb'

export const useMoveRound = () => {
  const [moveRoundIsLoading, setMoveRoundIsLoading] = useState<boolean>(false)
  const [moveRoundIsError, setMoveRoundIsError] = useState<boolean>(false)

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
    } catch (error) {
      console.error('Error moving round', error)
    } finally {
      setMoveRoundIsLoading(false)
      setMoveRoundIsError(false)
      setPlannerNeedsUpdate(true)
      setMoveRoundState(false)
    }
  }

  return { moveRoundIsLoading, moveRoundIsError, handleMoveRound }
}
