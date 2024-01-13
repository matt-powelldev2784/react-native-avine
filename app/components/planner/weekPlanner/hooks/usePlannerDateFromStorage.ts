import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const usePlannerDateFromStorage = (key: string) => {
  const [plannerDate, setPlannerDate] = useState<string>('')

  useEffect(() => {
    const getPlannerDateFromStorage = async (): Promise<void> => {
      const plannerDateFromStorage = await AsyncStorage.getItem(key)

      if (plannerDateFromStorage) {
        const parsedPlannerDate = JSON.parse(plannerDateFromStorage)
        setPlannerDate(parsedPlannerDate)
      }
    }
    getPlannerDateFromStorage()
  }, [key])

  return plannerDate
}

export default usePlannerDateFromStorage