import AsyncStorage from '@react-native-async-storage/async-storage'
import { formatDateForDb } from './formatDateForDb'

export const addPlannerDateToStorage = async (date: Date, key: string) => {
  console.log('date', date)
  console.log(
    'JSON.stringify(formatDateForDb(date)',
    JSON.stringify(formatDateForDb(date)),
  )
  await AsyncStorage.setItem(key, JSON.stringify(formatDateForDb(date)))
}
