import AsyncStorage from '@react-native-async-storage/async-storage'
import { convertDbDateToPlannerDate } from './convertDbDateToPlannerDate'
import { useEffect, useState } from 'react'

export const useGetPlannerDateFromStorage = async () => {
  const [plannerDate, setPlannerDate] = useState<Date | null>(null)

  useEffect(() => {
    const getPlannerDate = async () => {
      const plannerDateFromStorage = await AsyncStorage.getItem('plannerDate')

      if (!plannerDateFromStorage) {
        return
      }

      const parsedPlannerDate = JSON.parse(plannerDateFromStorage)
      const parsedDate = convertDbDateToPlannerDate(parsedPlannerDate)

      setPlannerDate(parsedDate)
    }
    getPlannerDate()
  }, [])

  return plannerDate
}
