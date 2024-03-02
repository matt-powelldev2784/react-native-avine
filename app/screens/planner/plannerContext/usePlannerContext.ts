import React from 'react'
import { createContext, useContext } from 'react'

interface PlannerContextType {
  displayWeek: Date
  setDisplayWeek: React.Dispatch<React.SetStateAction<Date>>
  selectedDay: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
}

export const PlannerContext = createContext<PlannerContextType>({
  displayWeek: new Date(),
  setDisplayWeek: () => {},
  selectedDay: new Date(),
  setSelectedDay: () => {},
})

export const usePlannerContext = () => useContext(PlannerContext)
