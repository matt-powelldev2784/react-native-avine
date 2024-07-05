import { useEffect, useState } from 'react'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'
import { getPlannerRoundTicket } from '../../../../db/planner/getRoundsByPlannerDate/getPlannerRoundTicket'
import { RoundWithRecurringFlagT } from '../../../../types/RoundT'

export const useRoundData = () => {
  const [round, setRound] = useState<RoundWithRecurringFlagT>()
  const { selectedRound, plannerCardNeedsUpdate, setPlannerCardNeedsUpdate } =
    usePlannerContext()

  //----------------------------------------------------------------------------------
  // get round data
  useEffect(() => {
    if (!selectedRound) return


    const getPlannerTicketData = async () => {
      const round = await getPlannerRoundTicket({
        plannerDate: selectedRound?.plannerDate,
        roundId: selectedRound?.roundId,
        recurringRound: selectedRound?.recurringRound,
      })

      if (round) setRound(round as RoundWithRecurringFlagT)
      setPlannerCardNeedsUpdate(false)
    }
    getPlannerTicketData()
  }, [plannerCardNeedsUpdate])

  return {
    round,
  }
}
