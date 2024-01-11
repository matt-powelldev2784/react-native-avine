import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const usePlannerDateFromStorage = () => {
  const [plannerDate, setPlannerDate] = useState<string>('')

  useEffect(() => {
    const getPlannerDateFromStorage = async (): Promise<void> => {
      const plannerDateFromStorage = await AsyncStorage.getItem('@plannerDate')

      if (plannerDateFromStorage) {
        const parsedPlannerDate = JSON.parse(plannerDateFromStorage)
        setPlannerDate(parsedPlannerDate)
      }
    }
    getPlannerDateFromStorage()
  }, [])

  return plannerDate
}
