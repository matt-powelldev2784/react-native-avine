import { createContext, useContext } from 'react'

interface WeekPlannerContextType {
  displayWeek: Date
  setDisplayWeek: React.Dispatch<React.SetStateAction<Date>>
  selectedDay: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
  storedDate: Date
  setStoredDate: React.Dispatch<React.SetStateAction<Date>>
}

export const WeekPlannerContext = createContext<WeekPlannerContextType>({
  displayWeek: new Date(),
  setDisplayWeek: () => {},
  selectedDay: new Date(),
  setSelectedDay: () => {},
  storedDate: new Date(),
  setStoredDate: () => {},
})

export const useWeekPlannerContext = () => useContext(WeekPlannerContext)
