import { SelectedJobT } from './../../../types/JobT'
import React from 'react'
import { createContext, useContext } from 'react'
import { SelectedRoundInfoT } from '../../../types/RoundT'

interface PlannerContextType {
  displayWeek: Date
  setDisplayWeek: React.Dispatch<React.SetStateAction<Date>>
  selectedDay: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
  highlightedDay: Date
  setHighlightedDay: React.Dispatch<React.SetStateAction<Date>>
  selectedJob: SelectedJobT | null
  selectedRound: SelectedRoundInfoT | null
  setSelectedRound: React.Dispatch<
    React.SetStateAction<SelectedRoundInfoT | null>
  >
  setSelectedJob: React.Dispatch<React.SetStateAction<SelectedJobT | null>>
  daysToView: number
  setDaysToView: React.Dispatch<React.SetStateAction<number>>
  plannerCardNeedsUpdate: boolean
  setPlannerCardNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  plannerNeedsUpdate: boolean
  setPlannerNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export const PlannerContext = createContext<PlannerContextType>({
  displayWeek: new Date(),
  setDisplayWeek: () => {},
  selectedDay: new Date(),
  setSelectedDay: () => {},
  highlightedDay: new Date(),
  setHighlightedDay: () => {},
  selectedJob: { jobId: '', roundId: '', recurringRound: false },
  setSelectedJob: () => {},
  selectedRound: { roundId: '', plannerDate: '', recurringRound: false },
  setSelectedRound: () => {},
  daysToView: 0,
  setDaysToView: () => {},
  plannerCardNeedsUpdate: false,
  setPlannerCardNeedsUpdate: () => {},
  plannerNeedsUpdate: false,
  setPlannerNeedsUpdate: () => {},
})

export const usePlannerContext = () => useContext(PlannerContext)
