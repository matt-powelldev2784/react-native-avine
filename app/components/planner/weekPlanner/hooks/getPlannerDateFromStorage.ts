import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const getPlannerDateFromStorage = (key: string) => {
  const [plannerDate, setPlannerDate] = useState<string>('')

  useEffect(() => {
    const getItemFromStorage = async (): Promise<void> => {
      const plannerDateFromStorage = await AsyncStorage.getItem(key)

      if (plannerDateFromStorage) {
        const parsedPlannerDate = JSON.parse(plannerDateFromStorage)
        setPlannerDate(parsedPlannerDate)
      }
    }
    getItemFromStorage()
  }, [key])

  return plannerDate
}

export default getPlannerDateFromStorage
