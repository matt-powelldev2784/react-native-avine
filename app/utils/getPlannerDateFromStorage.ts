import AsyncStorage from '@react-native-async-storage/async-storage'
import { convertDbDateToPlannerDate } from './convertDbDateToPlannerDate'

export const getPlannerDateFromStorage = async (key: string) => {
  const plannerDateFromStorage = await AsyncStorage.getItem(key)
  let plannerDate

  if (plannerDateFromStorage) {
    const parsedPlannerDate = JSON.parse(plannerDateFromStorage)
    plannerDate = convertDbDateToPlannerDate(parsedPlannerDate)
  }

  return plannerDate
}
