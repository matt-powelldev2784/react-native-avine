import { useEffect } from 'react'
import { usePlannerContext } from '../../../../screens/planner/plannerContext/usePlannerContext'

const useSetPlannerDate = (storedDate: Date | null) => {
  const { setDisplayWeek, setSelectedDay, selectedDay } = usePlannerContext()

  console.log('useSetPlannerDate ran')

  useEffect(() => {
    if (storedDate) {
      console.log('storedDate', storedDate)
      setSelectedDay(selectedDay)
      setDisplayWeek(storedDate)
      setSelectedDay(storedDate)
    }
  }, [storedDate])
}

export default useSetPlannerDate
