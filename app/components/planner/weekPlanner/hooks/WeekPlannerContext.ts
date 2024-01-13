import { createContext, useContext } from 'react'

interface WeekPlannerContextType {
  displayWeek: Date
  setDisplayWeek: React.Dispatch<React.SetStateAction<Date>>
  selectedDay: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
  refreshData: boolean
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>
}

export const WeekPlannerContext = createContext<WeekPlannerContextType>({
  displayWeek: new Date(),
  setDisplayWeek: () => {},
  selectedDay: new Date(),
  setSelectedDay: () => {},
  refreshData: false,
  setRefreshData: () => {},
})

export const useWeekPlanner = () => useContext(WeekPlannerContext)
