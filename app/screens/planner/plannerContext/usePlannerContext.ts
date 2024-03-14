import { SelectedJobT } from './../../../types/JobT'
import React from 'react'
import { createContext, useContext } from 'react'

interface PlannerContextType {
  displayWeek: Date
  setDisplayWeek: React.Dispatch<React.SetStateAction<Date>>
  selectedDay: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
  selectedJob: SelectedJobT | null
  setSelectedJob: React.Dispatch<React.SetStateAction<SelectedJobT | null>>
}

export const PlannerContext = createContext<PlannerContextType>({
  displayWeek: new Date(),
  setDisplayWeek: () => {},
  selectedDay: new Date(),
  setSelectedDay: () => {},
  selectedJob: { jobId: '', roundId: '', recurringRound: false },
  setSelectedJob: () => {},
})

export const usePlannerContext = () => useContext(PlannerContext)
